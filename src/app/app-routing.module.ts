import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'movies/:id', 
    loadChildren: () => import('./components/movie-details/movie-details.module').then(mod => mod.MovieDetailsModule)
  },
  {
    path: 'tv/:id',
    loadChildren: () => import('./components/tv-show-details/tv-show-details.module').then(mod => mod.TvShowDetailsModule)
  },
  {
    path : 'admin',
    loadChildren:() => import('./components/admin/admin.module').then(mod => mod.AdminModule)
  },
  {
    path : 'admin/downloadrequest',
    loadChildren:() => import('./components/admin-downloadRequest/admin-downloadRequest.module').then(mod => mod.AdminDownloadRequestModule)
  },

  {
    path : 'admin/movies',
    loadChildren:() => import('./components/admin-movies/admin-movies.module').then(mod => mod.AdminMoviesModule)
  },
  {
    path : 'admin/tv',
    loadChildren:() => import('./components/admin-tv/admin-tv.module').then(mod => mod.AdmintvModule)
  },

  {
    path: 'movies',
    loadChildren: () => import('./components/movies/movies.module').then(mod => mod.MoviesModule)
  },


  {
    path: 'tv',
    loadChildren: () => import('./components/tv-shows/tv-shows.module').then(mod => mod.TvShowsModule)
  },


  {
    path: 'genres/:id/:name',
    loadChildren: () => import('./components/genre/genre.module').then(mod => mod.GenreModule)
  },

  {
    path: 'genres',
    loadChildren: () => import('./components/genre-list/genre-list.module').then(mod => mod.GenreListModule)
  },
  {
    path: 'genres-tv/:id/:name',
    loadChildren: () => import('./components/tv-genre/tv-genre.module').then(m => m.TvGenreModule)
  },

  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
