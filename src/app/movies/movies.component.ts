import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from './../Services/movies-api.service';
import { MoviesDataService } from './../Services/movies-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit{
  movies: any = null;
  
  subscription: Subscription[] = []; 

  constructor(
    private moviesApiService: MoviesApiService,
    private moviesDataService: MoviesDataService
  ) { }

  ngOnInit(): void {
    this.subscription.push(this.moviesApiService.getMovies().subscribe(retuls => {
      this.moviesDataService.setMovies(retuls);
    }));
    this.subscription.push(this.moviesDataService.moviesList.subscribe(movies => {
      this.movies = movies}))
  }

  OnDestroy(){
    this.subscription.forEach(subscription => subscription.unsubscribe)
  }

}
