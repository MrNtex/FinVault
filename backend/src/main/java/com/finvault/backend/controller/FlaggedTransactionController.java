package com.finvault.backend.controller;

import com.finvault.backend.dto.CreateFlaggedTransactionRequest;
import com.finvault.backend.model.FlaggedTransaction;
import com.finvault.backend.service.FlaggedTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/flagged-transactions")
public class FlaggedTransactionController {

    private final FlaggedTransactionService flaggedTransactionService;

    @Autowired
    public FlaggedTransactionController(FlaggedTransactionService flaggedTransactionService) {
        this.flaggedTransactionService = flaggedTransactionService;
    }

    @PostMapping
    public ResponseEntity<FlaggedTransaction> createFlaggedTransaction(
            @RequestBody CreateFlaggedTransactionRequest request) {
        FlaggedTransaction transaction = flaggedTransactionService.createFlaggedTransaction(request.getReason());
        return ResponseEntity.ok(transaction);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlaggedTransaction> getFlaggedTransaction(@PathVariable Long id) {
        FlaggedTransaction transaction = flaggedTransactionService.getFlaggedTransaction(id);
        return ResponseEntity.ok(transaction);
    }
} 