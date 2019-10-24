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
      return this.httpService.get("/customer/findAll")
        .subscribe(response => {
          this.customerData = [];
          const results = Array.isArray(response) ? Array.from(response) : [];
          if (results.length > 0) {
            for (const obj of results) {
              this.customerData.push(obj);
            }
          }
        }, error => {
            alert(JSON.parse(JSON.stringify(error)).error);
          });
    }




}
