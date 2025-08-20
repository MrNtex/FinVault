package com.finvault.backend.repository;

import com.finvault.backend.model.Transaction;
import com.finvault.backend.model.TransactionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long>, JpaSpecificationExecutor<Transaction> {

    @Query(value = """
        SELECT t.* FROM transactions t 
        LEFT JOIN accounts a ON t.account_id = a.id
        WHERE (:startDate IS NULL OR t.date >= :startDate)
        AND (:endDate IS NULL OR t.date <= :endDate)
        AND (:type IS NULL OR t.transaction_type = :#{#type?.name()})
        AND (:minAmount IS NULL OR t.amount >= :minAmount)
        AND (:maxAmount IS NULL OR t.amount <= :maxAmount)
        AND (:description IS NULL OR LOWER(t.description) LIKE LOWER(CONCAT('%', :description, '%')))
        AND (:accountId IS NULL OR t.account_id = :accountId)
        AND (
            :isFlagged IS NULL OR
            (:isFlagged = TRUE AND t.flagged_id IS NOT NULL) OR
            (:isFlagged = FALSE AND t.flagged_id IS NULL)
        )
    """,
            countQuery = """
        SELECT COUNT(*) FROM transactions t 
        LEFT JOIN accounts a ON t.account_id = a.id
        WHERE (:startDate IS NULL OR t.date >= :startDate)
        AND (:endDate IS NULL OR t.date <= :endDate)
        AND (:type IS NULL OR t.transaction_type = :#{#type?.name()})
        AND (:minAmount IS NULL OR t.amount >= :minAmount)
        AND (:maxAmount IS NULL OR t.amount <= :maxAmount)
        AND (:description IS NULL OR LOWER(t.description) LIKE LOWER(CONCAT('%', :description, '%')))
        AND (:accountId IS NULL OR t.account_id = :accountId)
        AND (
            :isFlagged IS NULL OR
            (:isFlagged = TRUE AND t.flagged_id IS NOT NULL) OR
            (:isFlagged = FALSE AND t.flagged_id IS NULL)
        )
    """,
            nativeQuery = true)
    Page<Transaction> findTransactionsWithOptionalFilters(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("category") String category,
            @Param("type") TransactionType type,
            @Param("minAmount") BigDecimal minAmount,
            @Param("maxAmount") BigDecimal maxAmount,
            @Param("description") String description,
            @Param("isFlagged") Boolean isFlagged,
            @Param("accountId") String accountId,
            Pageable pageable
    );

    @Query("""
        SELECT AVG(t.amount) FROM Transaction t 
        WHERE t.account.id = :accountId
    """)
    BigDecimal findAverageTransactionAmount(@Param("accountId") int accountId);

    @Query(value = """
        SELECT COUNT(*) FROM transactions
        WHERE recipient_IBAN REGEXP :pattern
        AND account_id = :accountId""", nativeQuery = true)
    Long findTransactionsByIbanPattern(
            @Param("pattern") String pattern,
            @Param("accountId") int accountId
    );

    @Query(value = """
        SELECT COUNT(*)
        FROM transactions
        WHERE account_id = :accountId
        AND transaction_type = 'card'
        AND date >= :startTime
    """, nativeQuery = true)
    Long countRecentCardTransactions(
            @Param("accountId") int accountId,
            @Param("startTime") LocalDateTime startTime
    );

} 