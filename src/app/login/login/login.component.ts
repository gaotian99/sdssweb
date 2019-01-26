import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, of as ObservableOf } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  dataDatabase: NewsApiHttpDao | null;
  oneTitle = 'Big news will coming';
  oneContent = 'Please wait';
  onePic = '';
  oneUrl = 'http://www.espn.com';
  getNum = 0;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
      // new FormGroup({
      // email: new FormControl('yourname@email.com',
      //  Validators.compose([Validators.required, Validators.email])),
      // password: new FormControl('', Validators.required)
    // });

    this.dataDatabase = new NewsApiHttpDao(this.http);
    this.dataDatabase.getNewsFromHttp().pipe(
      map(data => {
        this.getNum = (data.totalResults !== null) ? data.totalResults : 0;
        return data.articles;
      }),
      catchError(() => ObservableOf([]))
    ).subscribe(data => {
      if (this.getNum > 0) {
        const pickNum: number = Math.floor(Math.random() * this.getNum);
        this.oneTitle = data[pickNum].title;
        this.oneContent = data[pickNum].description;
        this.onePic = data[pickNum].urlToImage;
        this.oneUrl = data[pickNum].url;
      }
    });
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
  }
}

export interface NewsApi {
  articles: NewsArticle[];
  totalResults: number;
  status: string;
}

export interface NewsArticle {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
}

export class NewsApiHttpDao {
  constructor(private http: HttpClient) { }

  getNewsFromHttp(): Observable<NewsApi> {
    const requestUrl = 'https://newsapi.org/v2/top-headlines?sources=espn&apiKey=e00ae47e21d5480fba47277a55348d0d';
    return this.http.get<NewsApi>(requestUrl);
  }
}
