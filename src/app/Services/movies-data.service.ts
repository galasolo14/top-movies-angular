import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesDataService {

  private movies = new BehaviorSubject<any>([]);
  moviesList = this.movies.asObservable();

  constructor() { }

  setMovies(list: any){
    this.movies.next(list)
  }

  updateMovies(newMovie: any){
    let newList = this.getMovies()
    
    let index = newList.findIndex( (object: any) => {
      return object.imdbID === newMovie.imdbID;
    })
    if(index >= 0){
      newList.splice(index,1)
      newList.splice(0,0, newMovie)
    }else{
      newList.splice(0,0, newMovie)
    }
    
    this.movies.next([...newList])
  }

  getMovies(){
    return this.movies.value;
  }

}
