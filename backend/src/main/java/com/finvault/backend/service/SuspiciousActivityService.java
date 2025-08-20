package com.finvault.backend.service;

import com.finvault.backend.model.FlaggedStatus;
import com.finvault.backend.model.FlaggedTransaction;
import com.finvault.backend.model.Transaction;
import com.finvault.backend.model.TransactionType;
import com.finvault.backend.repository.AccountRepository;
import com.finvault.backend.repository.TransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;

@Service
public class SuspiciousActivityService {
    private static final Logger logger = LoggerFactory.getLogger(SuspiciousActivityService.class);

    @Autowired
    private AccountRepository accountRepository;

    private static final int SUSPICIOUS_TRANSACTION_THRESHOLD = 3;
    private static final int SUSPICIOUS_TIME_WINDOW_MINUTES = 5;
    @Autowired
    private TransactionRepository transactionRepository;

    private static final int MAX_CURRENCIES_PER_DAY = 3;

    private static final BigDecimal UNUSUAL_AMOUNT_THRESHOLD_MULTIPLIER = new BigDecimal("150.00");;

    public String checkForUnusualAmount(Transaction transaction) {
        BigDecimal averageAmount = transactionRepository.findAverageTransactionAmount(
                transaction.getAccount().getId()
        );

        if (averageAmount != null &&
                transaction.getAmount().compareTo(averageAmount.multiply(UNUSUAL_AMOUNT_THRESHOLD_MULTIPLIER)) > 0) {
            return String.format("Unusual amount detected: %.2f is significantly higher than average %.2f",
                    transaction.getAmount(), averageAmount);
        }
        return null;
    }

    public String checkForConcurrentTransactions(Transaction transaction)
    {
        if (transaction.getTransactionType() != TransactionType.card) {
            return null; // We don't care about other transactions, user can be paying the bills
        }

        LocalDateTime startTimeUtc = LocalDateTime.now(ZoneOffset.UTC).minusMinutes(5);
        Long recentTransactions = transactionRepository.countRecentCardTransactions(
                transaction.getAccount().getId(),
                startTimeUtc
        );

        logger.info("Found {} recent card transactions in the last {} minutes for account {}. start time = {}",
            recentTransactions, SUSPICIOUS_TIME_WINDOW_MINUTES, transaction.getAccount().getId(), startTimeUtc);

        if (recentTransactions >= SUSPICIOUS_TRANSACTION_THRESHOLD) {
            return "Suspicious activity detected: " +
                    recentTransactions + " card transactions in the last " +
                    SUSPICIOUS_TIME_WINDOW_MINUTES + " minutes";
        }
        return null;
    }

    private static final int REQUIRED_TRANSACTIONS_TO_COUNTRY = 1;

    public String checkForOutlierCountry(Transaction transaction)
    {
        if (transaction.getRecipientIBAN().length() <= 2){
            return "Iban is too short";
        }

        Long recentTransactions = transactionRepository.findTransactionsByIbanPattern(
                transaction.getRecipientIBAN().substring(0,2),
                transaction.getAccount().getId()
        );

        if (recentTransactions < REQUIRED_TRANSACTIONS_TO_COUNTRY) {
            return "Suspicious activity detected: " +
                    "Payment to: " + transaction.getRecipientIBAN().substring(0,2)
                    + " was never done";
        }
        return null;
    }

    public FlaggedTransaction checkForSuspiciousActivity(Transaction transaction) {
        StringBuilder reasons = new StringBuilder();

        String concurrentResult = checkForConcurrentTransactions(transaction);
        if (concurrentResult != null) {
            reasons.append(concurrentResult).append("; ");
        }

        String countryResult = checkForOutlierCountry(transaction);
        if (countryResult != null) {
            reasons.append(countryResult).append("; ");
        }

        String unusualAmountResult = checkForUnusualAmount(transaction);
        if (unusualAmountResult != null) {
            reasons.append(unusualAmountResult).append("; ");
        }
        
        // If any suspicious activity was detected, create and return a FlaggedTransaction
        if (!reasons.isEmpty()) {
            FlaggedTransaction flaggedTransaction = new FlaggedTransaction();
            flaggedTransaction.setReason(reasons.toString().trim());
            flaggedTransaction.setFlaggedAt(LocalDateTime.now());
            flaggedTransaction.setStatus(FlaggedStatus.pending);
            return flaggedTransaction;
        }
        
        return null;
    }
} 