import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../domain/user.model'

@Injectable()
export class UserService {
  private readonly domain = 'users';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}


}
