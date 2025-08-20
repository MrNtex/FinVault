package com.finvault.backend.controller;

import com.finvault.backend.dto.CreateTransactionRequest;
import com.finvault.backend.model.Transaction;
import com.finvault.backend.model.TransactionType;
import com.finvault.backend.model.TransactionPageResponse;
import com.finvault.backend.service.TransactionService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:4200")
public class TransactionController {
    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public TransactionPageResponse getTransactions(
            @RequestParam(required = false) LocalDateTime startDate,
            @RequestParam(required = false) LocalDateTime endDate,
            @RequestParam(required = false) String category,
            @RequestParam(required = false, name = "type") TransactionType type,
            @RequestParam(required = false) BigDecimal minAmount,
            @RequestParam(required = false) BigDecimal maxAmount,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Boolean isFlagged,
            @RequestParam(required = false) String accountId,
            @RequestParam(required = false, defaultValue = "date") String sortBy,
            @RequestParam(required = false, defaultValue = "DESC") String direction,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) {

        return transactionService.getTransactions(
                startDate,
                endDate,
                category,
                type,
                minAmount,
                maxAmount,
                description,
                isFlagged,
                accountId,
                sortBy,
                direction,
                page,
                size
        );
    }

    @GetMapping("/{id}")
    public Transaction getTransaction(@PathVariable Long id) {
        return transactionService.getTransactionById(id);
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody CreateTransactionRequest request) {
        Transaction transaction = transactionService.createTransaction(request);
        return ResponseEntity.ok(transaction);
    }
} 