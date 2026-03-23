package lk.autohive.autohive_backend.model.dto;

import lk.autohive.autohive_backend.util.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.modulith.NamedInterface;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@NamedInterface
public class UserDto {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String contactNo;
    private String address;
    private Role role;
}