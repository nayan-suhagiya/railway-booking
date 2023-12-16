import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANT } from 'src/app/constant/constant';
import { PassengerInterface } from 'src/app/models/PassengerModel';
import { ResponseInterface } from 'src/app/models/ResponseModel';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  apiEndPoint!: string;

  constructor(private http: HttpClient) {
    this.apiEndPoint = environment.apiEndPoint;
  }

  addPassenger(
    registerData: PassengerInterface
  ): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.apiEndPoint + CONSTANT.ENDPOINTS.ADD_UPDATE_PASSENGER,
      registerData
    );
  }
}
