import { Component, OnInit } from '@angular/core';
import {HttpService} from "../services/http/http-service";
import {Customer} from "../types/customer/customer";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  private columnsToDisplay = ['Id','First Name', 'Last Name'];
  private customerData: Customer[] = [];
  private firstNameFilter = new FormGroup({
    firstName: new FormControl(null)
  });

  constructor(private httpService: HttpService){}

    ngOnInit() {
        this.applyFilter();
    }

  applyFilter() {
    console.log("usao u filter");
      return this.httpService
        .post("http://localhost:8080/customer/filter",this.firstNameFilter.value)
        .subscribe(response => {
          this.customerData = [];
          const results = Array.isArray(response) ? Array.from(response) : [];
          console.log(results);
          if (results.length > 0) {
            for (const obj of results) {
              console.log(obj);
              this.customerData.push(obj);
            }
          }
        }, error => {
            console.log(error);
          });
    }

}
