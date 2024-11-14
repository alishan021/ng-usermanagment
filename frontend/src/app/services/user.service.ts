import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResult, LoginUser, RegisterUser, User } from '../interfaces/interface';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser!: string;
  userId!: number;
  userDetails!: User;

  constructor(private http: HttpClient) { }

  onRegister(obj: RegisterUser): Observable<JSONResult>{
    return this.http.post<JSONResult>('http://localhost:3000/createUser', obj);
  }

  onLogin(obj: LoginUser): Observable<JSONResult> {
    this.currentUser = obj.username;
    return this.http.post<JSONResult>('http://localhost:3000/login', obj );
  }

  onGetAllUsers(): Observable<JSONResult> {
    return this.http.get<JSONResult>('http://localhost:3000/getAllUsers');
  }

  onCreateUser(obj: RegisterUser): Observable<JSONResult> {
    return this.http.post<JSONResult>('http://localhost:3000/createUser', obj)
  }

  // getUserByid(username: string): Observable<JSONResult> {
  //    return this.http.get<JSONResult>('http://localhost:3000/user/${id}');
  // }

  onDeleteUser(id: number): Observable<JSONResult> {
    return this.http.delete<JSONResult>(`http://localhost:3000/deleteUser/${id}`);
  }

  onUpdateUser(obj: Partial<User>, id: number): Observable<JSONResult> {
    return this.http.put<JSONResult>(`http://localhost:3000/updateUser/${id}`, obj);
  }

  onGetUserDetails(id: number) {
    return this.http.get<JSONResult>(`http://localhost:3000/user/${id}`);
  }

  getUserDetails() {
    return this.userDetails;
  }

}
