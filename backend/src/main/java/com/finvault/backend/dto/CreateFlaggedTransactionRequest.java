package com.finvault.backend.dto;

import lombok.Data;

@Data
public class CreateFlaggedTransactionRequest {
    private String reason;
} 