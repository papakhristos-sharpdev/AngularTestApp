import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { meals } from '../meals';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-meal-info',
  templateUrl: './meal-info.component.html',
  styleUrls: ['./meal-info.component.css']
})
export class MealInfoComponent implements OnInit {
	meal;
  constructor(
	  private route: ActivatedRoute,
	  private cartService: CartService
) { }

  ngOnInit() {
	this.route.paramMap.subscribe(params => {
		this.meal = meals[params.get('mealId')];
	});
	}

	addToCart(meal) {
		this.cartService.addToCart(meal);
		window.alert('Your meal has been added to the cart!');
	}
}
