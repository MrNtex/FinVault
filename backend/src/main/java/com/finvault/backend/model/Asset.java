package com.finvault.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Document(collection = "bankAssets")
public class Asset {
    @Id
    private String id;
    
    private String type;
    private String assetId;
    private BigDecimal quantityKg;
    private BigDecimal quantity;
    private BigDecimal pricePerKgUSD;
    private BigDecimal pricePerUnitUSD;
    private BigDecimal totalValueUSD;
    private String location;
    private String walletAddress;
    private String symbol;
    private String exchange;
    private String issuer;
    private BigDecimal faceValueUSD;
    private BigDecimal interestRate;
    private LocalDateTime maturityDate;
    private LocalDateTime purchaseDate;
    private String address;
    private BigDecimal estimatedValueUSD;
    private LocalDateTime acquiredDate;
    private LocalDateTime lastUpdated;
} 