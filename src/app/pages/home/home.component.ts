import { Component, OnInit } from '@angular/core';
import { StationService } from '../services/station.service';
import { StationInterface } from 'src/app/models/Station';
import { ResponseInterface } from 'src/app/models/ResponseModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  stationList!: StationInterface[];

  constructor(private stationService: StationService) {}

  ngOnInit() {
    this.loadStations();
  }

  loadStations() {
    this.stationService.getAllStation().subscribe({
      next: (res: ResponseInterface) => {
        this.stationList = res.data;
        // console.log(this.stationList);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Station data fetched');
      },
    });
  }
}
