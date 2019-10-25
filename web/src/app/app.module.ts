import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CustomersComponent} from './customers/customers.component';
import {HttpClientModule} from "@angular/common/http";
import {HttpService} from "./services/http/http-service";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path:'customers/all',
        component:CustomersComponent
      }
    ])
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
