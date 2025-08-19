import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EnsemblService {

  private server = 'https://rest.ensembl.org';


  constructor(private http: HttpClient) {}

  getSpeciesInfo(): Observable<any> {
    const ext = '/info/species?';
    return this.http.get(`${this.server}${ext}`, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError(this.handleError)
    );
  }

  /** Get assembly info for species */
  getAssemblyInfo(species:string): Observable<any> {
    const ext = `/info/assembly/${species}?`;
    return this.http.get(`${this.server}${ext}`, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API call failed:', error);
    return throwError(() => new Error('Something went wrong with the API request.'));
  }


}
