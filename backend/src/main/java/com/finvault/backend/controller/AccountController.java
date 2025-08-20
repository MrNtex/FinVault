package com.finvault.backend.controller;

import com.finvault.backend.model.Account;
import com.finvault.backend.model.AccountType;
import com.finvault.backend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "*")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping
    public ResponseEntity<List<Account>> getAccounts(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) Integer userId,
            @RequestParam(required = false) String accountNumber,
            @RequestParam(required = false) AccountType type,
            @RequestParam(required = false) String currency) {
        
        List<Account> accounts = accountService.getFilteredAccounts(
            id, userId, accountNumber, type, currency);
        
        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable Long id) {
        Account account = accountService.getAccountById(id);
        return ResponseEntity.ok(account);
    }

    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        Account savedAccount = accountService.createAccount(account);
        return ResponseEntity.ok(savedAccount);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(
            @PathVariable Long id,
            @RequestBody Account accountDetails) {
        Account updatedAccount = accountService.updateAccount(id, accountDetails);
        return ResponseEntity.ok(updatedAccount);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
        accountService.deleteAccount(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/balance")
    public ResponseEntity<BigDecimal> getAccountBalance(@PathVariable Long id) {
        BigDecimal balance = accountService.getAccountBalance(id);
        return ResponseEntity.ok(balance);
    }
} 