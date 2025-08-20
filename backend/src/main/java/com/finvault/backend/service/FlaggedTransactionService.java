package com.finvault.backend.service;

import com.finvault.backend.model.FlaggedTransaction;
import com.finvault.backend.model.FlaggedStatus;
import com.finvault.backend.repository.FlaggedTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class FlaggedTransactionService {

    private final FlaggedTransactionRepository flaggedTransactionRepository;

    @Autowired
    public FlaggedTransactionService(FlaggedTransactionRepository flaggedTransactionRepository) {
        this.flaggedTransactionRepository = flaggedTransactionRepository;
    }

    @Transactional
    public FlaggedTransaction createFlaggedTransaction(String reason) {
        FlaggedTransaction transaction = new FlaggedTransaction();
        transaction.setReason(reason);
        transaction.setFlaggedAt(LocalDateTime.now());
        transaction.setStatus(FlaggedStatus.pending);
        return flaggedTransactionRepository.save(transaction);
    }

    public FlaggedTransaction getFlaggedTransaction(Long id) {
        return flaggedTransactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flagged transaction not found with id: " + id));
    }
} 