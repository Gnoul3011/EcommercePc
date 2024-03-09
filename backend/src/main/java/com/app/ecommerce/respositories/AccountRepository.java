package com.app.ecommerce.respositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.ecommerce.models.Account;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    Optional<Account> findByUsername(String username);

    Optional<Account> findByEmail(String email);

    @Query(value = "select * from account where deleted_at is null", nativeQuery = true)
    List<Account> findAllAccountActive();

    @Query(value = "select * from account where deleted_at is not null", nativeQuery = true)
    List<Account> findAllAccountNotActive();
}
