import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bike } from '../classes/bike';
import { BikeService } from '../services/bike.service';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.css']
})
export class BikeComponent implements OnInit {

  bikes: Bike[];

  constructor(private bikeService: BikeService) { }

  ngOnInit(): void {
    this.bikeService.getBikes().subscribe({
      next: bikes => this.bikes = bikes,
      error: error => console.error(error),
      complete: () => console.log('All bikes has been fetched successfully.')
    })
  }

}
