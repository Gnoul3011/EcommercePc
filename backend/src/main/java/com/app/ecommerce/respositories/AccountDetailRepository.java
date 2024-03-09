package com.app.ecommerce.respositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.app.ecommerce.models.AccountDetail;

import jakarta.transaction.Transactional;

public interface AccountDetailRepository extends JpaRepository<AccountDetail, Integer> {
    @Query(value = "select * from account_detail where account_id = ?1", nativeQuery = true)
    Optional<AccountDetail> findByAccountId(Integer accountId);

    @Query(value = "select * from account_detail where deleted_at is null", nativeQuery = true)
    List<AccountDetail> findAllAccountDetailActive();

    @Query(value = "select * from account_detail where deleted_at is not null", nativeQuery = true)
    List<AccountDetail> findAllAccountDetailNotActive();

    @Transactional
    @Modifying
    @Query(value = "UPDATE account_detail SET is_default = false WHERE account_id = ?1; UPDATE account_detail SET is_default = true WHERE id = ?2", nativeQuery = true)
    void removAccountDetailsDefault(Integer accountId, Integer accountDetailId);

    @Query(value = "select public.account_detail.* from account_detail LEFT JOIN public.account ON account.id = account_detail.account_id WHERE is_default = true AND account.username = ?1", nativeQuery = true)
    Optional<AccountDetail> findAccountDetailDefault(String username);

    @Query(value = "select public.account_detail.* from account_detail LEFT JOIN public.account ON account.id = account_detail.account_id WHERE account.username = ?1 AND account_detail.deleted_at IS NULL ORDER BY account_detail.is_default DESC", nativeQuery = true)
    Optional<List<AccountDetail>> findAllAccountDetail(String username);
}
