package Application;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
@CrossOrigin
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

    @PostMapping("/filter")
    public List<Customer> findByFirstName(@RequestBody CustomerFilter customerFilter) {
        String firstName = customerFilter.getFirstName();
        if(firstName == null){
            return customerService.getAllCustomers();
        }
         List<Customer> customerList = customerService.findCustomerByFirstName(firstName);
         return customerList;
    }
}
