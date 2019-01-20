//import { Component, OnInit } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { NullInjector } from '@angular/core/src/di/injector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  dataDatabase: NewsApiHttpDao | null;
  oneTitle: string = "Big news will coming";
  oneContent: string = "Please wait";
  onePic: string = "https://www.espnfrontrow.com/wp-content/uploads/2017/04/Cropped698by400ESPNlogo.jpg";
  data: NewsArticle = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.dataDatabase = new NewsApiHttpDao(this.http);
    this.dataDatabase.getNewsFromHttp().toPromise()
      .then( datab => this.data = datab.articles[0] )
    if(!this.data)
    {
      this.oneTitle = this.data.title;
      this.oneContent = this.data.description;
      this.onePic = this.data.urlToImage;
    }
  }

  private handleError(error: any): Promise<any> {
    console.error("error occurred", error);
    return Promise.reject(error.message || error);
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
}

export class NewsApiHttpDao {
  constructor(private http: HttpClient) {}

  getNewsFromHttp(): Observable<NewsApi> {
    const requestUrl = "https://newsapi.org/v2/top-headlines?sources=espn&apiKey=e00ae47e21d5480fba47277a55348d0d";
    return this.http.get<NewsApi>(requestUrl);
  }
}
