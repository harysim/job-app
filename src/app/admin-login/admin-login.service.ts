import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Corrected import path

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  private apiUrl = environment.apiUrl; // Use the environment variable for the API URL

  constructor(private http: HttpClient) { }

  // Login method
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/admin-login`,
      { username, password },
      { headers, withCredentials: true }
    );
  }

  // Get applications method
  getApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/dashboard`,
      { withCredentials: true }
    );
  }

  // Get a single application by ID method
  getApplicationById(applicationId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/application/${applicationId}`,
      { withCredentials: true }
    );
  }

  // Update application method
  updateApplication(applicationId: string, updatedData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.apiUrl}/application/${applicationId}`,
      updatedData,
      { headers, withCredentials: true }
    );
  }

  // Delete application method
  deleteApplication(applicationId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/application/${applicationId}`,
      { withCredentials: true }
    );
  }

  // Logout method
  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout`,
      { withCredentials: true }
    );
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Save the authentication token
  saveAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Clear the authentication token (for logout)
  clearAuthToken(): void {
    localStorage.removeItem('authToken');
  }
}
