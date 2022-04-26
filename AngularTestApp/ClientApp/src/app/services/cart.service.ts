import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

@Injectable()
export class CartService {
    items = [];

    constructor(
        private http: HttpClient
    ) {
    }

    addToCart(meal) {
        this.items.push(meal);
    }

    getItems() {
        return this.items;
    }

    clearCart() {
        this.items = [];
        return this.items;
    }

    getShippingPrices() {
        return this.http.get('/assets/shipping.json');
    }
}