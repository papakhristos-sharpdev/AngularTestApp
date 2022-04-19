import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-meal-alert',
    templateUrl: './meal-alert.component.html',
    styleUrls: ['./meal-alert.component.css']
})

export class MealAlertComponent {
    @Input() meal;
    @Output() notify = new EventEmitter();
    constructor() {
    }

    ngOnInit() {
    }
}