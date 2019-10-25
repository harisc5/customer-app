import { Component, OnInit } from '@angular/core';
import {HttpService} from "../services/http/http-service";
import {Customer} from "../types/customer/customer";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  private columnsToDisplay = ['Id','First Name', 'Last Name'];
  private customerData: Customer[] = [];

  constructor(private httpService: HttpService){}

    ngOnInit() {
        this.applyFilter();
    }

  applyFilter() {
    console.log("usao u filter");
      return this.httpService
        .get("/customer/getAll")
        .subscribe(response => {
          console.log(response);
          this.customerData = [];
          console.log("dosao do results");
          const results = Array.isArray(response) ? Array.from(response) : [];
          console.log(results);
          if (results.length > 0) {
            for (const obj of results) {
              console.log(this.customerData);
              this.customerData.push(obj);
            }
          }
        }, error => {
            console.log(error);
          });
    }
}
