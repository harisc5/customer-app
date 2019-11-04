import {Component, OnInit} from '@angular/core';
import {HttpService} from "../services/http/http-service";
import {Customer} from "../types/customer/customer";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  private columnsToDisplay = ['ID', 'FIRST NAME', 'LAST NAME'];
  private customerData: Customer[] = [];
  private displayAdd: boolean = false;
  private displayDeleteModal: boolean = false;
  private selectedId: number;
  private firstNameFilter = new FormGroup({
    firstName: new FormControl(null)
  });
  private customerForm = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl(),
    lastName: new FormControl()
  });

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.applyFilter();
  }

  applyFilter() {
    return this.httpService
      .post("http://localhost:8080/customer/filter", this.firstNameFilter.value)
      .subscribe(response => {
        this.customerData = [];
        const results = Array.isArray(response) ? Array.from(response) : [];
        if (results.length > 0) {
          for (const obj of results) {
            this.customerData.push(obj);
          }
        }
      }, error => {
        console.log(error);
      });
  }

  saveCustomer() {
    return this.httpService.post("http://localhost:8080/customer/create", this.customerForm.value)
      .subscribe(message => {
          alert("Successfully saved new customer");
          this.closeModal();
          this.applyFilter();
        },
        error => {
          alert(JSON.parse(JSON.stringify(error)).error);
        });
  }

  deleteCustomer(id) {
    this.httpService.delete('http://localhost:8080/customer/delete/' + id).subscribe(
      response => {
        if (response) {
          alert("Delete customer with id: " + id);
          this.closeModal();
          this.applyFilter();
        } else {
          alert("Failed to delete customer with id:" + id);
        }
      },
      error => {
        alert(JSON.parse(JSON.stringify(error)).error);
      }
    );
  }

  openModal() {
    this.displayAdd = true;
  }

  openDelete(id) {
    this.displayDeleteModal = true;
    this.selectedId = id;
  }

  closeModal() {
    this.displayAdd = false;
    this.displayDeleteModal = false;
  }
}
