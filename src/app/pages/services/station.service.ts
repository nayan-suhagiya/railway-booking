import { CONSTANT } from './../../constant/constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseInterface } from 'src/app/models/ResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  apiEndPoint: string = '';

  constructor(private http: HttpClient) {
    this.apiEndPoint = environment.apiEndPoint;
  }

  getAllStation(): Observable<ResponseInterface> {
    // console.log(this.apiEndPoint + CONSTANT.ENDPOINTS.GET_ALL_STATIONS);

    return this.http.get<ResponseInterface>(
      this.apiEndPoint + CONSTANT.ENDPOINTS.GET_ALL_STATIONS
    );
  }
}
