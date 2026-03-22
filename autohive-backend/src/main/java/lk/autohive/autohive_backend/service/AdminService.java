package lk.autohive.autohive_backend.service;

import lk.autohive.autohive_backend.model.dto.UserDto;

import java.util.List;
import java.util.Map;

public interface AdminService {

    List<UserDto> getAllUsers();

    List<UserDto> getFarmers();

    List<UserDto> getBusiness();

    Object updateUser(UserDto userDto);

    Object deleteUser(String userEmail);

    Map<String,Object> getFarmersTotal();

    Map<String, Object> getBusinessTotal();
}

