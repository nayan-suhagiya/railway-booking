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
  isLoggedIn: boolean = false;
  loggedInUserPhone!: number;

  title = 'railway-booking';

  constructor(
    private formBuilder: FormBuilder,
    private passengerService: PassengerService
  ) {}

  ngOnInit(): void {
    const loggedInPassenger = sessionStorage.getItem('LoggedInPassenger');
    if (loggedInPassenger != null) {
      const loggedInData = JSON.parse(loggedInPassenger);
      this.isLoggedIn = true;
      this.loggedInUserPhone = loggedInData.phone;
    } else {
      this.isLoggedIn = false;
    }
  }

  registerForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        ),
      ],
    ],
    mobile: [
      '',
      [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)],
    ],
  });

  registerHandle() {
    // console.log(this.registerForm.value);
    const registerData = {
      firstName: String(this.registerForm.value.firstName),
      lastName: String(this.registerForm.value.lastName),
      email: String(this.registerForm.value.email),
      phone: String(this.registerForm.value.mobile),
      password: String(this.registerForm.value.password),
    };

    this.passengerService.addPassenger(registerData).subscribe({
      next: (res: ResponseInterface) => {
        console.log(res);
        const resData = res.data;
        if (res.result) {
          sessionStorage.setItem('LoggedInPassenger', JSON.stringify(res.data));
          alert('Registeration success!!');
        } else {
          alert(`Unable to register!! ${res.message}`);
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Passenger add complete! Response fetched!');
      },
    });
  }
}
