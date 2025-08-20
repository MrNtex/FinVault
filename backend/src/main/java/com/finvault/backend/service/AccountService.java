package com.finvault.backend.service;

import com.finvault.backend.model.Account;
import com.finvault.backend.model.AccountType;
import com.finvault.backend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public List<Account> getFilteredAccounts(
            Long id,
            Integer userId,
            String accountNumber,
            AccountType type,
            String currency) {
        
        Specification<Account> spec = Specification.where(null);

        if (id != null) {
            spec = spec.and((root, query, cb) -> 
                cb.equal(root.get("id"), id));
        }

        if (userId != null) {
            spec = spec.and((root, query, cb) -> 
                cb.equal(root.get("user_id"), userId));
        }

        if (accountNumber != null && !accountNumber.isEmpty()) {
            spec = spec.and((root, query, cb) -> 
                cb.like(root.get("accountNumber"), "%" + accountNumber + "%"));
        }

        if (type != null) {
            spec = spec.and((root, query, cb) -> 
                cb.equal(root.get("type"), type));
        }

        if (currency != null && !currency.isEmpty()) {
            spec = spec.and((root, query, cb) -> 
                cb.equal(root.get("currency"), currency));
        }

        return accountRepository.findAll(spec);
    }

    public Account getAccountById(Long id) {
        return accountRepository.findById(id)
            .orElseThrow(() -> new jakarta.persistence.EntityNotFoundException("Account not found with id: " + id));
    }

    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    public Account updateAccount(Long id, Account accountDetails) {
        Account account = getAccountById(id);
        
        account.setUser_id(accountDetails.getUser_id());
        account.setAccountNumber(accountDetails.getAccountNumber());
        account.setType(accountDetails.getType());
        account.setCurrency(accountDetails.getCurrency());
        
        return accountRepository.save(account);
    }

    public void deleteAccount(Long id) {
        Account account = getAccountById(id);
        accountRepository.delete(account);
    }

    public BigDecimal getAccountBalance(Long accountId) {
        // Verify account exists
        getAccountById(accountId);
        return accountRepository.calculateAccountBalance(accountId);
    }
} 