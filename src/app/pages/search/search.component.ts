import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchModel } from 'src/app/models/SearchModel';
import { StationService } from '../services/station.service';
import { ResponseInterface } from 'src/app/models/ResponseModel';
import { StationInterface } from 'src/app/models/Station';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  departureStationId!: number;
  departureStation!: string;
  arrivalStationId!: number;
  arrivalStation!: string;
  departureDate!: string;
  searchData!: SearchModel;
  searchResult!: SearchModel[];
  searchResultCount: number = 0;
  stationList!: StationInterface[];

  constructor(
    private router: ActivatedRoute,
    private stationService: StationService
  ) {}

  ngOnInit(): void {
    this.departureStationId = Number(
      this.router.snapshot.params['departureStationId']
    );
    // console.log(this.departureStationId);
    this.arrivalStationId = Number(
      this.router.snapshot.params['arrivalStationId']
    );
    this.departureDate = this.router.snapshot.params['departureDate'];

    this.searchData = {
      departureStationId: this.departureStationId,
      arrivalStationId: this.arrivalStationId,
      departureDate: this.departureDate,
    };

    // console.log(this.searchData);
    this.loadSearch();
    this.loadStations();
  }

  loadSearch() {
    this.stationService.getTrainsBetweenStations(this.searchData).subscribe({
      next: (res: ResponseInterface) => {
        this.searchResult = res.data;
        this.searchResultCount = res.data.length;
        // console.log(this.searchResult);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Train data fetched!');
      },
    });
  }

  loadStations() {
    this.stationService.getAllStation().subscribe({
      next: (res: ResponseInterface) => {
        this.stationList = res.data;
        // console.log(this.stationList);

        const departureStationData = this.stationList.find((station) => {
          return station.stationID == this.departureStationId;
        });
        // console.log(departureStationData);
        this.departureStation = String(departureStationData?.stationName);

        const arrivalStationData = this.stationList.find((station) => {
          return station.stationID == this.arrivalStationId;
        });
        // console.log(arrivalStationData);
        this.arrivalStation = String(arrivalStationData?.stationName);

        this.stationList = this.stationList.filter((station) => {
          return (
            station.stationID != this.departureStationId &&
            station.stationID != this.arrivalStationId
          );
        });
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
