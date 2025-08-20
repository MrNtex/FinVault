package com.finvault.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "FlaggedTransactions")
public class FlaggedTransaction {
//    CREATE TABLE FlaggedTransactions (
//            id INT PRIMARY KEY AUTO_INCREMENT,
//            reason TEXT NOT NULL,
//            flagged_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//            flagged_by VARCHAR(100) DEFAULT 'system',
//    status ENUM('pending', 'resolved', 'dismissed') DEFAULT 'pending'
//            );
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String reason;

    @Column(name="flagged_at", nullable = false)
    private LocalDateTime flaggedAt;

    @Enumerated(EnumType.STRING)
    @Column
    private FlaggedStatus status;

    @Column(name="resolution_notes")
    private String resolutionNotes;

    // Getters, setters, constructors
} 