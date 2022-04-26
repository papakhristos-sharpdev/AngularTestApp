import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealInfoComponent } from './meal-info/meal-info.component';
import { MealAlertComponent } from './meal-alert/meal-alert.component';
import { CartService } from './services/cart.service';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
        AppComponent,
        MenuComponent,
        MealListComponent,
        MealInfoComponent,
        MealAlertComponent,
        CartComponent,
        //LoginComponent
  ],
  imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', component: MealListComponent },
          //  { path: 'login', component: LoginComponent },
	        { path: 'meals/:mealId', component: MealInfoComponent },
            { path: 'cart', component: CartComponent },
        ])
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
