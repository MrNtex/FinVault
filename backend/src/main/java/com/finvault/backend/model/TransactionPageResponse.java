package com.finvault.backend.model;

import java.util.List;

public record TransactionPageResponse(
    List<Transaction> transactions,
    int currentPage,
    int pageSize,
    Long totalElements
) {} 