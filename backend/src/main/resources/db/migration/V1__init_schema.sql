SET default_storage_engine=InnoDB;

-- Tabela: Users

CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT
    ,email VARCHAR(255) NOT NULL UNIQUE
    ,password_hash VARCHAR(255) NOT NULL
    ,full_name VARCHAR(255) NOT NULL
    ,phone VARCHAR(20)
    ,created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: Accounts
CREATE TABLE Accounts (
    id INT PRIMARY KEY AUTO_INCREMENT
    ,user_id INT NOT NULL
    ,account_number VARCHAR(28) NOT NULL UNIQUE
    -- balance DECIMAL(12, 2) DEFAULT 0, calculated as a sum of transactions
    ,type ENUM('personal', 'business', 'savings') NOT NULL
    ,currency VARCHAR(3) DEFAULT 'PLN'
    ,FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Tabela: FlaggedTransactions
CREATE TABLE Flagged_Transactions (
    id INT PRIMARY KEY AUTO_INCREMENT
    ,reason TEXT NOT NULL
    ,flagged_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ,flagged_by VARCHAR(100) DEFAULT 'system'
    ,status ENUM('pending', 'resolved', 'dismissed') DEFAULT 'pending'
    ,resolution_notes TEXT
);

-- Transactions
CREATE TABLE Transactions (
    id INT PRIMARY KEY AUTO_INCREMENT
    ,account_id INT NOT NULL
    ,recipient_IBAN VARCHAR(34) NOT NULL
    ,amount DECIMAL(10, 2) NOT NULL
    ,date DATETIME NOT NULL
    ,description TEXT
    ,flagged_id INT NULL
    ,transaction_type ENUM('card', 'transfer', 'recurring')
    ,FOREIGN KEY (account_id) REFERENCES Accounts(id)
    ,FOREIGN KEY (flagged_id) REFERENCES Flagged_Transactions(id)
);

-- Tabela: Cards
CREATE TABLE Cards (
    card_number VARCHAR(16) PRIMARY KEY
    ,account_id INT NOT NULL
    ,type ENUM('debit', 'credit') NOT NULL
    ,expiration_date DATE NOT NULL
    ,cvv_hash VARCHAR(255) NOT NULL
    ,FOREIGN KEY (account_id) REFERENCES Accounts(id)
);

-- Transactions: Card
CREATE TABLE Transactions_Card (
    id INT PRIMARY KEY
    ,card_number VARCHAR(16) NOT NULL
    ,FOREIGN KEY (id) REFERENCES Transactions(id) ON DELETE CASCADE
    ,FOREIGN KEY (card_number) REFERENCES Cards(card_number)
);


-- Tabela: Loans
CREATE TABLE Loans (
    id INT PRIMARY KEY AUTO_INCREMENT
    ,user_id INT NOT NULL
    ,amount DECIMAL(12, 2) NOT NULL
    ,interest_rate DECIMAL(5, 2) NOT NULL
    ,term_months INT NOT NULL
    ,monthly_payment DECIMAL(12, 2) NOT NULL
    ,status ENUM('active', 'closed', 'defaulted') DEFAULT 'active'
    ,FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Tabela: Payments
CREATE TABLE Payments (
    id INT PRIMARY KEY AUTO_INCREMENT
    ,account_id INT NOT NULL
    ,amount DECIMAL(10, 2) NOT NULL
    ,recipient VARCHAR(255) NOT NULL
    ,scheduled_date DATE NOT NULL
    ,status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled'
    ,FOREIGN KEY (account_id) REFERENCES Accounts(id)
);
