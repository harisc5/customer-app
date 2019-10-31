package Application;

import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
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
    public JSONObject customerCreate(@RequestBody Customer customer) {
        final String messageKey = "message";
        JSONObject response = new JSONObject();

        customerService.saveCustomer(customer);
        response.put(messageKey, "Successfully saved new customer");

        return response;
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
    public boolean deleteById(@PathVariable long id){
        try {
            customerService.deleteCustomer(id);
            return true;
        }
        catch (Exception e){
            log.error("Error while deleting customer" + e.getMessage());
            return false;
        }
    }
}
