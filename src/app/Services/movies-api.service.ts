import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {

  url = '/api/movies'
  // url = 'http://localhost:3004/movies'

  constructor(private http:HttpClient) { }

  getMovies(){
    let result = this.http.get(this.url)
    return result
  }

  getMoviesList(Moviename: string){
    // let result = this.http.get(`${this.url}/search/${Moviename}`)
    let result = this.http.get(`${this.url}/search/${Moviename}`)
    return result
  }

  getNewMovie(movie: any){
    let result = this.http.get(`${this.url}/getMovie/${movie}`)
    return result
  }
}
