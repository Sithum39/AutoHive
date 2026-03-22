package lk.autohive.autohive_backend.repository;

import lk.autohive.autohive_backend.model.entity.User;
import lk.autohive.autohive_backend.util.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

    User getUsersByEmail(String email);

    void deleteByEmail(String userEmail);

    List<User> findByRole(Role role);

    List<User> findByCreatedDateBetween(LocalDate startDate, LocalDate endDate);
}
