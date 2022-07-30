import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from './../Services/movies-api.service';
import { MoviesDataService } from './../Services/movies-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {
  searchValue: any = '';
  timer: any;
  options: any = [];
  noOptions: any = null;

  constructor(
    private moviesApiService: MoviesApiService,
    private moviesDataService: MoviesDataService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
  }

  searchMovie(val:any){
    if(this.searchValue.length > 2 && val){
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.moviesApiService.getMoviesList(val).subscribe(((retuls: any) => {
          this.options = retuls.data ? retuls.data : []
          this.noOptions = !retuls.data ? retuls.message : null
        }))
      },500)
    }else{
      this.options = [];
    }
    
  }

  selectMovie(movie: any){
    this.moviesApiService.getNewMovie(movie).subscribe(((retuls: any) => {
      if(retuls.data){
        this.moviesDataService.updateMovies(retuls.data);
        this.onClear();
      }else{
        this.toastrService.error(retuls.message, "Error")
      }
    }))
  }

  onClear(){
    this.searchValue = '';
    this.options = [];
    this.noOptions = null;
  }

}
