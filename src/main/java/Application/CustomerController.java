package Application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    CustomerRepository customerRepository;

    @PostMapping("/create")
    public String customerCreate(@RequestBody Customer customer) {
        customerRepository.save(customer);
        return "Successfully saved";
    }

    @GetMapping("/findAll")
    public List<Customer> findAll() {
        List<Customer> customers = customerRepository.findAll();
        return customers;
    }

    @PostMapping("/search")
    public List<Customer> findByFirstName(@RequestBody CustomerFilter customerFilter) {
        List<Customer> customers = customerRepository.findByFirstName(customerFilter.getFirstName());
        return customers;
    }
}
