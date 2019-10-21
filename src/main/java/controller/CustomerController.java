package controller;

import entity.Customer;
import filter.CustomerFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import repository.CustomerRepository;

import java.util.List;

@RestController
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
        List<Customer> customers = customerRepository.findByFirstName(customerFilter.toString());
        return customers;
    }
}
