package Application;

import lombok.Data;

import java.io.Serializable;

@Data
public class CustomerFilter implements Serializable {
    public String firstName;
}
