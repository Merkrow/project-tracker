import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { LocalStorageService } from './localstorage.service';
import { User } from '../models';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private http: Http,
    private storage: LocalStorageService
  ) {}

  populate() {
    const credentials = this.storage.getCredentials();
    if (credentials) {
      this.apiService.post('/api/employees/login', credentials)
      .subscribe(
       data => {
         const { Password } = data;
         this.setAuth(data, Password);
         return data;
       },
       err => this.purgeAuth()
      );
     } else {
       this.purgeAuth();
     }
  }

  setAuth(user: User, Password: string) {
    this.storage.saveCredentials({ Login: user.Email, Password });
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  getUserById(Id): Observable<User> {
    return this.apiService.get(`/api/employees/${Id}`)
    .map(data => data);
  }

  purgeAuth() {
    this.storage.removeCredentials();
    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  getUsers(): Observable<User[]> {
    return this.apiService.get(`/api/employees`)
    .map(data => data);
  }

  attemptAuth(type, credentials): Observable<User> {
    const endPoint = type === 'login' ? '/login' : '';
    return this.apiService.post(`/api/employees${endPoint}`, credentials)
    .map(
      data => {
        const { Password } = data;
        this.setAuth(data, Password);
        return data;
      }
    );
  }

  deleteUser(id): Observable<any> {
    return this.apiService.delete(`/api/employees/${id}`)
    .map(data => data);
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  updateUser(params) {
    return this.apiService.put(`/api/employees`, params)
    .map(data => data);
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService
    .put('/user', { user })
    .map(data => {
      // Update the currentUser observable
      this.currentUserSubject.next(data.user);
      return data.user;
    });
  }

}
