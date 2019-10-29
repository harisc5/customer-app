package Application;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    CustomerService(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }
    public List<Customer> getAllCustomers(){
        return customerRepository.findAll();
    }

    public void saveCustomer(Customer customer){
        customerRepository.save(customer);
    }

    public List<Customer> findCustomerByFirstName(String firstName){
        return customerRepository.getByFirstName(firstName);
    }
}
