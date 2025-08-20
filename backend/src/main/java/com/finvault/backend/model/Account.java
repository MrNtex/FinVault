package com.finvault.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
@Table(name = "Accounts")
public class Account {
//    CREATE TABLE Accounts (
//            id INT PRIMARY KEY AUTO_INCREMENT
//            ,user_id INT NOT NULL
//            ,account_number VARCHAR(28) NOT NULL UNIQUE
//    -- balance DECIMAL(12, 2) DEFAULT 0, calculated as a sum of transactions
//    ,type ENUM('personal', 'business', 'savings') NOT NULL
//    ,currency VARCHAR(3) DEFAULT 'PLN'
//            ,FOREIGN KEY (user_id) REFERENCES Users(id)
//            );

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private int user_id;

    @Column(nullable = false)
    private String accountNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AccountType type;

    @Column(nullable = false)
    private String currency;
    // Getters, setters, constructors
} 