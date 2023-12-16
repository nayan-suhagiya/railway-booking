import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PassengerService } from './pages/services/passenger.service';
import { ResponseInterface } from './models/ResponseModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'railway-booking';

  constructor() {}

  ngOnInit(): void {}
}
