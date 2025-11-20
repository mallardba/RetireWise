import Database from 'better-sqlite3';
import { DATABASE_CONFIG } from '../constants/index.js';
import { ContributionType, AccountType, PayFrequency } from '../enums/index.js';

const db = new Database(DATABASE_CONFIG.FILENAME, {
  timeout: DATABASE_CONFIG.TIMEOUT
});

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    salary REAL NOT NULL,
    age INTEGER NOT NULL,
    date_of_birth TEXT NOT NULL,
    pay_frequency TEXT NOT NULL,
    retirement_age INTEGER NOT NULL,
    contribution_type TEXT NOT NULL,
    contribution_amount REAL NOT NULL,
    account_type TEXT NOT NULL,
    ytd_employee_contribution REAL NOT NULL DEFAULT 0,
    ytd_employer_contribution REAL NOT NULL DEFAULT 0,
    employer_match_enabled INTEGER NOT NULL DEFAULT 0,
    employer_match_percentage REAL NOT NULL DEFAULT 0,
    employer_match_cap_percentage REAL NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contribution_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    contribution_type TEXT NOT NULL,
    contribution_amount REAL NOT NULL,
    account_type TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE INDEX IF NOT EXISTS idx_user_id ON contribution_history(user_id);
`);

const seedUser = db.prepare(`
  INSERT OR IGNORE INTO users (
    id, name, email, salary, age, date_of_birth, pay_frequency,
    retirement_age, contribution_type, contribution_amount, account_type,
    ytd_employee_contribution, ytd_employer_contribution,
    employer_match_enabled, employer_match_percentage, employer_match_cap_percentage
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

seedUser.run(
  'user-1',
  'Brandon',
  'brandon@example.com',
  120000,
  30,
  '1994-06-15',
  PayFrequency.BIWEEKLY,
  65,
  ContributionType.PERCENTAGE,
  5,
  AccountType.TRADITIONAL,
  5000,
  2000,
  1,
  50, // Match 50% of employee contributions
  6   // Up to 6% of salary
);

export default db;
