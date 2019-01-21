//import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of as ObservableOf } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  dataDatabase: NewsApiHttpDao | null;
  oneTitle: string = "Big news will coming";
  oneContent: string = "Please wait";
  onePic: string = "";
  oneUrl: string = "http://www.espn.com";
  getNum: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.dataDatabase = new NewsApiHttpDao(this.http);
    this.dataDatabase!.getNewsFromHttp().pipe(
      map(data => {
        this.getNum = (data.totalResults !== null) ? data.totalResults : 0;
        //if(this.getNum > 0) this.getNum = Math.floor(Math.random()*this.getNum);
        return data.articles;
      }),
      catchError(() => ObservableOf([]))
    ).subscribe(data => {
      if (this.getNum > 0) {
        let pickNum: number = Math.floor(Math.random()*this.getNum);
        this.oneTitle = data[pickNum].title;
        this.oneContent = data[pickNum].description;
        this.onePic = data[pickNum].urlToImage;
        this.oneUrl = data[pickNum].url;
      }
    });



    //.toPromise()
    //  .then( datab => {
    //    this.oneTitle = datab.articles[0].title;
    //    this.oneContent = datab.articles[0].description;
    //    this.onePic = datab.articles[0].urlToImage;
    //    this.oneUrl = datab.articles[0].url;
    //  } ).catch(this.handleError);
  }

  //  private handleError(error: any): Promise<any> {
  //    console.error("error occurred", error);
  //    return Promise.reject(error.message || error);
  //  }

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
    const requestUrl = "https://newsapi.org/v2/top-headlines?sources=espn&apiKey=e00ae47e21d5480fba47277a55348d0d";
    return this.http.get<NewsApi>(requestUrl);
  }
}
