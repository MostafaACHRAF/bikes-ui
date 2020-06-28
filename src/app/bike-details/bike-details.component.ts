import { Component, OnInit } from '@angular/core';
import { Bike } from '../classes/bike';
import { BikeService } from '../services/bike.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bike-details',
  templateUrl: './bike-details.component.html',
  styleUrls: ['./bike-details.component.css']
})
export class BikeDetailsComponent implements OnInit {

  bike: Bike;

  constructor(private bikeService: BikeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const bikeId: number = +this.activatedRoute.snapshot.paramMap.get('id');
    this.bikeService.getBike(bikeId).subscribe({
      next: bike => this.bike = bike,
      error: err => console.log(`Failed to get bike with id ${bikeId} !`),
      complete: () => console.log(`The bike with id ${bikeId} has been fetched successfully.`)
    })
  }

}
