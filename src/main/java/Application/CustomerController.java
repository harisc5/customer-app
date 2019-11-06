package Application;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
@CrossOrigin
@Slf4j
public class CustomerController {

    private final CustomerService customerService;

    CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/create")
    public Boolean customerCreate(@RequestBody Customer customer) {
        customerService.saveCustomer(capitalizeCustomer(customer));
        return true;
    }

    @PostMapping("/filter")
    public List<Customer> findByFirstName(@RequestBody CustomerFilter customerFilter) {
        String firstName = customerFilter.getFirstName();
        if (firstName == null) {
            return customerService.getAllCustomers();
        }
        List<Customer> customerList = customerService.findCustomerByFirstName(firstName);
        return customerList;
    }

    @DeleteMapping("/delete/{id}")
    public boolean deleteById(@PathVariable long id) {
        try {
            customerService.deleteCustomer(id);
            return true;
        } catch (Exception e) {
            log.error("Error while deleting customer" + e.getMessage());
            return false;
        }
    }

    private Customer capitalizeCustomer(Customer customer) {
        Customer customerCap = new Customer();
        String fname = customer.getFirstName().substring(0, 1).toUpperCase() + customer.getFirstName().substring(1).toLowerCase();
        String lname = customer.getLastName().substring(0, 1).toUpperCase() + customer.getLastName().substring(1).toLowerCase();
        customerCap.setFirstName(fname);
        customerCap.setLastName(lname);

        return customerCap;
    }
}