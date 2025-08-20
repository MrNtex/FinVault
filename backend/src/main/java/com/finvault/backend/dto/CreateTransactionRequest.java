package com.finvault.backend.dto;

import com.finvault.backend.model.TransactionType;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class CreateTransactionRequest {
    private Long accountId;
    private String recipientIBAN;
    private BigDecimal amount;
    private LocalDateTime date;
    private String description;
    private TransactionType transactionType;
} 