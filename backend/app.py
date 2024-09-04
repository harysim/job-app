from flask import Flask, request, jsonify, session, redirect, url_for, send_file
import os
import psycopg2
from werkzeug.utils import secure_filename
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from a .env file (if used locally)
load_dotenv()

# Initialize the Flask application with the static folder configured
app = Flask(__name__, static_folder='www', static_url_path='/')
app.secret_key = os.getenv("FLASK_SECRET_KEY", "Man010@@02024&&")
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)

UPLOAD_FOLDER = 'uploads/'
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Use environment variables for database connection
conn = psycopg2.connect(
    dbname=os.getenv("DB_NAME", "jobapp_lt8w"),
    user=os.getenv("DB_USER", "sari"),
    password=os.getenv("DB_PASSWORD", "Ar3Pltvr3ZVJIkT25ROwx5vI7s5LawlC"),
    host=os.getenv("DB_HOST", "dpg-crbnihl6l47c73d7uj50-a.oregon-postgres.render.com"),
    port=os.getenv("DB_PORT", "5432")
)
cursor = conn.cursor()

# Define allowed file types
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# API endpoint for submitting job application
@app.route('/api/submit', methods=['POST'])
def submit():
    full_name = request.form['firstName']
    phone = request.form['phoneNumber']
    email = request.form['email']
    gender = request.form['gender']
    job_type = request.form['jobType']

    # Handle file uploads
    cv = request.files['cv']
    additional_files = request.files.getlist('additionalFiles')

    if not cv or not allowed_file(cv.filename):
        return jsonify({'error': 'السيرة الذاتية مطلوبة ويجب أن تكون من نوع ملف صالح.'}), 400

    cv_filename = secure_filename(cv.filename)
    cv.save(os.path.join(app.config['UPLOAD_FOLDER'], cv_filename))

    additional_filenames = []
    for file in additional_files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            additional_filenames.append(filename)

    # Insert data into PostgreSQL
    cursor.execute(
        "INSERT INTO job_applications (full_name, phone, email, gender, job_type, cv, additional_files) VALUES (%s, %s, %s, %s, %s, %s, %s)",
        (full_name, phone, email, gender, job_type, cv_filename, ','.join(additional_filenames))
    )
    conn.commit()

    return jsonify({'message': 'تم إرسال الطلب بنجاح!'}), 200

# API endpoint for admin login
@app.route('/api/admin-login', methods=['POST'])
def admin_login():
    username = request.json['username']
    password = request.json['password']

    # Fetch the admin user from the database
    cursor.execute("SELECT * FROM admins WHERE username = %s", (username,))
    admin = cursor.fetchone()

    # Compare the plain-text password using bcrypt
    if admin and bcrypt.check_password_hash(admin[2], password):
        session['admin'] = admin[0]
        return jsonify({'message': 'تم تسجيل الدخول بنجاح!'}), 200
    else:
        return jsonify({'error': 'بيانات الدخول غير صحيحة'}), 401

# API endpoint to get job applications for admin dashboard
@app.route('/api/admin/dashboard', methods=['GET'])
def admin_dashboard():
    if 'admin' not in session:
        return jsonify({'error': 'غير مصرح لك بالدخول'}), 401

    # Fetch all job applications from the database
    cursor.execute("SELECT id, full_name, phone, email, gender, job_type, cv, additional_files FROM job_applications")
    applications = cursor.fetchall()

    # Convert the data to a list of dictionaries
    applications_list = [
        {
            'id': app[0],
            'full_name': app[1],
            'phone': app[2],
            'email': app[3],
            'gender': app[4],
            'job_type': app[5],
            'cv': app[6],
            'additional_files': app[7].split(',') if app[7] else []
        }
        for app in applications
    ]

    return jsonify(applications_list), 200

# API endpoint to get a single job application by ID
@app.route('/api/application/<int:id>', methods=['GET'])
def get_application(id):
    if 'admin' not in session:
        return jsonify({'error': 'غير مصرح لك بالدخول'}), 401

    cursor.execute("SELECT id, full_name, phone, email, gender, job_type, cv, additional_files FROM job_applications WHERE id = %s", (id,))
    app = cursor.fetchone()

    if app:
        application = {
            'id': app[0],
            'full_name': app[1],
            'phone': app[2],
            'email': app[3],
            'gender': app[4],
            'job_type': app[5],
            'cv': app[6],
            'additional_files': app[7].split(',') if app[7] else []
        }
        return jsonify(application), 200
    else:
        return jsonify({'error': 'Application not found'}), 404

# API endpoint to delete a job application
@app.route('/api/application/<int:id>', methods=['DELETE'])
def delete_application(id):
    cursor.execute("DELETE FROM job_applications WHERE id = %s", (id,))
    conn.commit()
    return jsonify({'message': 'تم حذف الطلب بنجاح!'}), 200

# API endpoint to download files
@app.route('/api/download/<filename>', methods=['GET'])
def download_file(filename):
    return send_file(os.path.join(app.config['UPLOAD_FOLDER'], filename), as_attachment=True)

# API endpoint for logout
@app.route('/api/logout', methods=['GET'])
def logout():
    session.pop('admin', None)
    return jsonify({'message': 'تم تسجيل الخروج بنجاح!'}), 200

# Serve the Angular frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    return app.send_static_file('index.html')

# The app.run() block is removed since Gunicorn will be used to run the app in production.
