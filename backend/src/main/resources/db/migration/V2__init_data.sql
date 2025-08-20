INSERT INTO Users (id, email, password_hash, full_name, phone, created_at) VALUES
                                                                               (1, 'jan.kowalski@example.com', '$2b$12$abcdefghijklmnopqrstuv', 'Jan Kowalski', '123456789', '2024-01-15 10:00:00'),
                                                                               (2, 'anna.nowak@example.com', '$2b$12$wxyzabcdefghijklmnopqr', 'Anna Nowak', '987654321', '2024-02-20 11:30:00'),
                                                                               (3, 'piotr.wisniewski@example.com', '$2b$12$1234567890abcdefghijkl', 'Piotr Wiśniewski', '555111222', '2024-03-10 09:15:00');

-- ACCOUNTS
INSERT INTO Accounts (id, user_id, account_number, type, currency) VALUES
                                                                       (101, 1, 'PL10105000001111222233334444', 'personal', 'PLN'),
                                                                       (102, 1, 'PL20105000005555666677778888', 'savings', 'PLN'),
                                                                       (103, 2, 'PL30105000009999000011112222', 'business', 'PLN'),
                                                                       (104, 3, 'PL40105000001234567890123456', 'personal', 'EUR');

-- CARDS
INSERT INTO Cards (card_number, account_id, type, expiration_date, cvv_hash) VALUES
                                                                                 ('1111222233334444', 101, 'debit', '2028-12-31', 'hash_cvv_jan_debit'),
                                                                                 ('5555666677778888', 101, 'credit', '2027-10-31', 'hash_cvv_jan_credit'),
                                                                                 ('9999000011112222', 103, 'debit', '2028-06-30', 'hash_cvv_anna_debit');

-- PAYMENTS
INSERT INTO Payments (id, account_id, amount, recipient, scheduled_date, status) VALUES
                                                                                     (1, 101, 1500.00, 'Landlord Rent Account PL00123...', '2025-06-01', 'scheduled'),
                                                                                     (2, 103, 250.00, 'Software Subscription XYZ', '2025-05-20', 'scheduled');

-- FLAGGED TRANSACTIONS
INSERT INTO Flagged_Transactions (id, reason, flagged_at, flagged_by, status) VALUES
    (1, 'Unusually large transaction amount from a savings account.', '2025-05-10 14:30:00', 'system', 'pending');

-- TRANSACTIONS
INSERT INTO Transactions (id, account_id, recipient_IBAN, amount, date, description, flagged_id, transaction_type) VALUES
                                                                                                                       (1001, 101, 'MERCH_ID_Biedronka', -75.50, '2025-05-15 10:05:00', 'Groceries at Biedronka', NULL, 'card'),
                                                                                                                       (1002, 101, 'PL50109000001212121234343434', -250.00, '2025-05-16 11:15:00', 'Electricity Bill Payment', NULL, 'transfer'),
                                                                                                                       (1003, 101, 'PL00COMPANYIBAN00SALARY0000', 5200.00, '2025-05-10 09:00:00', 'Monthly Salary May', NULL, 'transfer'),
                                                                                                                       (1004, 103, 'MERCH_ID_Allegro', -120.00, '2025-05-14 16:45:00', 'Office Supplies from Allegro', NULL, 'card'),
                                                                                                                       (1005, 102, 'PL90102000009898989876767676', -15000.00, '2025-05-10 14:25:00', 'Large transfer to external account', 1, 'transfer'),
                                                                                                                       (1006, 101, 'PL11223344556677889900PLN', -300.00, '2025-05-01 08:00:00', 'Recurring payment: Gym Membership', NULL, 'recurring');

-- TRANSACTIONS_CARD
INSERT INTO Transactions_Card (id, card_number) VALUES
                                                    (1001, '1111222233334444'),
                                                    (1004, '9999000011112222');

-- PROCESS A COMPLETED PAYMENT (e.g. payment ID=2)
UPDATE Payments SET status = 'completed' WHERE id = 2 AND scheduled_date <= '2025-05-18';

INSERT INTO Transactions (account_id, recipient_IBAN, amount, date, description, flagged_id, transaction_type)
SELECT
    103,
    'IBAN_FOR_Software_Subscription_XYZ',
    -250.00,
    '2025-05-20 10:00:00',
    'Executed Scheduled Payment: Software Subscription XYZ',
    NULL,
    'transfer'
FROM Payments
WHERE id = 2 AND status = 'completed';