package com.finvault.backend.repository;

import com.finvault.backend.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long>, JpaSpecificationExecutor<Account> {
    @Query("""
        SELECT a FROM Account a WHERE (:id IS NULL OR a.id = :id)
    """)
    List<Account> findByAccountId(@Param("id") Long id);

    @Query("""
        SELECT COALESCE(SUM(t.amount), 0) 
        FROM Transaction t 
        WHERE t.account.id = :accountId
    """)
    BigDecimal calculateAccountBalance(@Param("accountId") Long accountId);
}
