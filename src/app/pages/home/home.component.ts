import { Component, OnInit } from '@angular/core';
import { StationService } from '../services/station.service';
import { StationInterface } from 'src/app/models/Station';
import { ResponseInterface } from 'src/app/models/ResponseModel';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  stationList!: StationInterface[];

  constructor(
    private stationService: StationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStations();
  }

  searchForm = this.formBuilder.group({
    departureStationId: ['', Validators.required],
    arrivalStationId: ['', Validators.required],
    departureDate: ['', Validators.required],
  });

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

  searchFormHandle() {
    // console.log(this.searchForm.value);
    const loggedInData = sessionStorage.getItem('LoggedInPassenger');
    if (loggedInData) {
      this.router.navigate([
        `/search/${this.searchForm.value.departureStationId}/${this.searchForm.value.arrivalStationId}/${this.searchForm.value.departureDate}`,
      ]);
    } else {
      alert('Please login!');
    }
  }
}
