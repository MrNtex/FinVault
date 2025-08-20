package com.finvault.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "Transactions")
public class Transaction {
//    CREATE TABLE Transactions (
//            id INT PRIMARY KEY AUTO_INCREMENT,
//            account_id INT NOT NULL,
//            recipient_IBAN VARCHAR(34) NOT NULL,
//    amount DECIMAL(10, 2) NOT NULL,
//    date DATETIME NOT NULL,
//    description TEXT,
//    flagged_id INT NULL,
//    transaction_type ENUM('card', 'transfer', 'recuring'),
//    FOREIGN KEY (account_id) REFERENCES Accounts(id),
//    FOREIGN KEY (flagged_id) REFERENCES FlaggedTransactions(id)
//            );
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @Column(name = "recipient_IBAN")
    private String recipientIBAN;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private LocalDateTime date;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToOne
    @JoinColumn(name = "flagged_id")
    private FlaggedTransaction flagged;

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_type", nullable = false)
    private TransactionType transactionType;

    // Getters, setters, constructors (can use Lombok)
}
