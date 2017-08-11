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

const userUrl = '/api/employees';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  private isAdminSubject = new ReplaySubject<boolean>(1);
  private isPmSubject = new ReplaySubject<boolean>(1);
  public isPm = this.isPmSubject.asObservable();
  public isAdmin = this.isAdminSubject.asObservable();
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private http: Http,
    private storage: LocalStorageService
  ) {}

  populate() {
    const credentials = this.storage.getCredentials();
    if (credentials) {
      this.apiService.post(`${userUrl}/login`, credentials)
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
    this.isAdminSubject.next(false);
    this.isPmSubject.next(false);
    if (user.PositionId === 1) {
      this.isPmSubject.next(true);
    }
    if (user.Email === "roger.federer@dataart.com") {
      this.isAdminSubject.next(true);
    }
    this.isAuthenticatedSubject.next(true);
  }

  getUserById(Id): Observable<User> {
    return this.apiService.get(`${userUrl}/${Id}`);
  }

  purgeAuth() {
    this.storage.removeCredentials();
    this.currentUserSubject.next(new User());
    this.isAuthenticatedSubject.next(false);
    this.isPmSubject.next(false);
    this.isAdminSubject.next(false);
  }

  getUsers(): Observable<User[]> {
    return this.apiService.get(userUrl)
  }

  attemptAuth(type, credentials): Observable<User> {
    const endPoint = type === 'login' ? '/login' : '';
    return this.apiService.post(`${userUrl}${endPoint}`, credentials)
    .map(
      data => {
        const { Password } = data;
        this.setAuth(data, Password);
        return data;
      }
    );
  }

  deleteUser(id): Observable<any> {
    return this.apiService.delete(`${userUrl}/${id}`);
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  updateUser(user: User) {
    return this.apiService.put(userUrl, user);
  }

  postUser(user): Observable<any> {
    return this.apiService.post(userUrl, user);
  }

}
