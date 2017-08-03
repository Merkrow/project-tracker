import { Injectable } from '@angular/core';


@Injectable()
export class LocalStorageService {

  getCredentials(): String {
    return JSON.parse(localStorage.getItem('credentials'));
  }

  saveCredentials(credentials: {}) {
    localStorage.setItem('credentials', JSON.stringify(credentials));
  }

  removeCredentials() {
    localStorage.removeItem('credentials');
  }

}
