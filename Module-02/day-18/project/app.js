import { transactions } from "./transactions.js";
import { totalByType, formatReceipts, updateTransaction } from "./report.js";

const totalDebits = totalByType(transactions, "debit");
const totalCredits = totalByType(transactions, "credit");

console.log(`Total Debits: ${totalDebits} ETB`);
console.log(`Total Credits: ${totalCredits} ETB`);

const receipts = formatReceipts(transactions);
console.log("Receipts:", receipts);

const updatedTxn = updateTransaction(transactions[0], 300);
console.log("Original Transaction:", transactions[0]);
console.log("Updated Transaction:", updatedTxn);