package webapp.weblab4.DTO;

import lombok.Data;
import lombok.NonNull;

@Data
public class UserDTO {
    @NonNull
    private String username;

    @NonNull
    private String password;
}
