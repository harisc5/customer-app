package Application;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    private final CustomerService customerService;

    CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/create")
    public String customerCreate(@RequestBody Customer customer) {
        customerService.saveCustomer(customer);
        return "Successfully saved";
    }

    @GetMapping("/getAll")
    public List<Customer> getAll() {
        return customerService.getAllCustomers();

    }

    @PostMapping("/search")
    public List<Customer> findByFirstName(@RequestBody CustomerFilter customerFilter) {
         List<Customer> customerList = customerService.findCustomerByFirstName(customerFilter);
         return customerList;
    }
}
