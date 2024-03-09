package com.app.ecommerce.respositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.ecommerce.DTO.order.MonthlyRevenue;
import com.app.ecommerce.DTO.order.TrustedBuyer;
import com.app.ecommerce.models.AccountOrder;

public interface AccountOrderRepository extends JpaRepository<AccountOrder, Integer> {
        @Query(value = "SELECT * from account_order where username = ?1 ORDER BY created_at DESC, id DESC", nativeQuery = true)
        List<AccountOrder> findByUsername(String username);

        @Query(value = "SELECT * from account_order where username = ?1 LIMIT 1", nativeQuery = true)
        Optional<AccountOrder> findUsername(String username);

        @Query(value = "SELECT SUM(account_order.total) AS total , date_part('month',account_order.created_at) AS month "
                        + //
                        "FROM account_order " + //
                        "WHERE account_order.status != 'CANCELED' " + //
                        "GROUP BY date_part('month',account_order.created_at)", nativeQuery = true)
        List<MonthlyRevenue> getMonthlyRevenues();

        @Query(value = "SELECT SUM(account_order.total) AS total, COUNT(account_order.id) as totalOrder, account_order.username as username "
                        + //
                        "FROM account_order  " + //
                        "WHERE account_order.status = 'SUCCESS'  " + //
                        "GROUP BY account_order.username " + //
                        "ORDER BY totalOrder DESC, total DESC " + //
                        "LIMIT 5", nativeQuery = true)
        List<TrustedBuyer> getTrustedBuyers();
}
