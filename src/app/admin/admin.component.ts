import { Component, OnInit } from '@angular/core';
import { BikeService } from '../services/bike.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  bikeModels: any;
  bikesForm: FormGroup;
  validationMsg: string;

  constructor(private bikeService: BikeService, private formBuilder: FormBuilder) {
    this.bikesForm = this.formBuilder.group({
      name: '',
      email: '',
      phone: '',
      model: '',
      purchaseDate: '',
      purchasePrice: '',
      contact: ''
    });
  }

  ngOnInit(): void {
    this.bikeService.getBikeModels().subscribe({
      next: models => this.bikeModels = models,
      error: err => console.log('Failed to fetch bikes models ! ' + err),
      complete: () => console.log('Bike models has been fetched successfully.')
    });
  }

  onSubmit(data) {
    console.log('submited form !');

    if (this.bikesForm.valid) {
      this.bikeService.createBike(this.bikesForm.value).subscribe({
        next: data => console.log(data),
        error: err => console.log("Failed to send data to backend server !"),
        complete: () => console.log("Form data has been successfully sent to backend server.")
      });
      this.validationMsg = 'Thank you. The form data has been submitted successfully.'
      this.bikesForm.reset();
      console.log(data);
    } else {
      this.validationMsg = 'Ooops ! Something went wrong, please check you data.';
    }
  }

}
