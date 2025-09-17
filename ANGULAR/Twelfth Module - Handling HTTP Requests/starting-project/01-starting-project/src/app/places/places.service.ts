import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);
  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong fetching available places. Please try again later.'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong fetching your favorite places. Please try again later.'
    ).pipe(
      tap({
        //used to execute code as we would do in subscribe, but without subscribing. the deprecated popup in the intellisense is a bug
        next: (places) => this.userPlaces.set(places),
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();
    if (!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.update((places) => [...places, place]); //optimistic updating, since we are updating the signal before the request is completed, we can show the user the new place immediately
      //but if any error happens with the put request, we need to revert the update
    }

    return this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: place.id,
      })
      .pipe(
        catchError((error) => {
          this.userPlaces.set(prevPlaces); //revert the update if the request fails
          console.log(error);
          this.errorService.showError(
            'Something went wrong adding your favorite place. Please try again later.'
          );
          return throwError(
            () =>
              new Error(
                'Something went wrong adding your favorite place. Please try again later.'
              )
          );
        })
      );
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();
    if (prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.update((places) =>
        places.filter((p) => p.id !== place.id)
      ); //optimistic updating, since we are updating the signal before the request is completed, we can show the user the new place immediately
      //but if any error happens with the put request, we need to revert the update
    }

    return this.httpClient
      .delete(`http://localhost:3000/user-places/${place.id}`)
      .pipe(
        catchError((error) => {
          console.log(error);
          this.userPlaces.set(prevPlaces); //revert the update if the request fails
          this.errorService.showError(
            'Something went wrong removing your favorite place. Please try again later.'
          );
          return throwError(
            () =>
              new Error(
                'Something went wrong removing your favorite place. Please try again later.'
              )
          );
        })
      );
  }

  private fetchPlaces(url: string, userFriendlyErrorMessage: string) {
    return (
      this.httpClient
        .get<{ places: Place[] }>(url) //get response type will match the type in backend app.js for /places
        //we can specify a second parameter to get that will configure the request, like observe: 'response' to get the full HTTP response object instead of just the body (in that case we need to access the body property of the response object)
        //whats more is that next in subscribe will trigger multiple times, once for each request cycle (if using the response object). without that, we can just say next: (response) => this.places.set(response.places)
        .pipe(
          map((response) => response.places), //we will get rid of the places object containing the places array and just pass the places array to next
          //a different way to handle errors is to use catchError operator instead of error in subscribe. catchError returns a new observable that will emit the error
          catchError((error) => {
            //with this we will effectively log the error, transform it so that the handler in subscribe can get the Error object
            console.log(error);
            this.errorService.showError(userFriendlyErrorMessage);
            return throwError(() => new Error(userFriendlyErrorMessage)); //throwError returns an observable that will emit the error down to the error handler in subscribe
          })
        )
    );
  }
}
