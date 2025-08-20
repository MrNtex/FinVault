package com.finvault.backend.service;

import com.finvault.backend.dto.CreateTransactionRequest;
import com.finvault.backend.model.Transaction;
import com.finvault.backend.model.FlaggedTransaction;
import com.finvault.backend.model.TransactionType;
import com.finvault.backend.model.TransactionPageResponse;
import com.finvault.backend.repository.TransactionRepository;
import com.finvault.backend.repository.FlaggedTransactionRepository;
import com.finvault.backend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Console;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class TransactionService {
    private static final Logger logger = LoggerFactory.getLogger(TransactionService.class);

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private FlaggedTransactionRepository flaggedTransactionRepository;

    @Autowired
    private SuspiciousActivityService suspiciousActivityService;

    @Autowired
    private AccountRepository accountRepository;

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + id));
    }

    @Transactional
    public Transaction createTransaction(CreateTransactionRequest request) {
        // Get the account
        var account = accountRepository.findById(request.getAccountId())
                .orElseThrow(() -> new RuntimeException("Account not found with id: " + request.getAccountId()));

        // Create the transaction
        Transaction transaction = new Transaction();
        transaction.setAccount(account);
        transaction.setRecipientIBAN(request.getRecipientIBAN());
        transaction.setAmount(request.getAmount());
        transaction.setDate(request.getDate());
        transaction.setDescription(request.getDescription());
        transaction.setTransactionType(request.getTransactionType());

        // Check for suspicious activity
        FlaggedTransaction flaggedTransaction = suspiciousActivityService.checkForSuspiciousActivity(transaction);
        if (flaggedTransaction != null) {
            // Save the flagged transaction first
            FlaggedTransaction savedFlaggedTransaction = flaggedTransactionRepository.save(flaggedTransaction);
            transaction.setFlagged(savedFlaggedTransaction);
        }
        
        return transactionRepository.save(transaction);
    }

    public TransactionPageResponse getTransactions(
            LocalDateTime startDate,
            LocalDateTime endDate,
            String category,
            TransactionType type,
            BigDecimal minAmount,
            BigDecimal maxAmount,
            String description,
            Boolean isFlagged,
            String accountId,
            String sortBy,
            String direction,
            int page,
            int size
            ) {
        
        Sort sort = Sort.by(Sort.Direction.fromString(direction != null ? direction : "DESC"), 
                          sortBy != null ? sortBy : "date");
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Transaction> transactionPage = transactionRepository.findTransactionsWithOptionalFilters(
                startDate,
                endDate,
                category,
                type,
                minAmount,
                maxAmount,
                description,
                isFlagged,
                accountId,
                pageable
        );

        return new TransactionPageResponse(
                transactionPage.getContent(),
                page,
                size,
                transactionPage.getTotalElements()
        );
    }
} 