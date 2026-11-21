"use client";

import type { Transaction } from "@/types/transaction";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  if (transactions.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-6 text-center text-muted-foreground">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary hover:bg-secondary">
            <TableHead className="text-foreground">Customer</TableHead>
            <TableHead className="text-foreground">Service</TableHead>
            <TableHead className="text-foreground">Appointment Date</TableHead>
            <TableHead className="text-foreground">Amount</TableHead>
            <TableHead className="text-foreground">Session ID</TableHead>
            <TableHead className="text-foreground">Payment Status</TableHead>
            <TableHead className="text-foreground">Transaction Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell>
                <p className="font-medium">{transaction.customerName}</p>
                <p className="text-xs text-muted-foreground">
                  {transaction.customerEmail}
                </p>
              </TableCell>

              <TableCell>{transaction.serviceName}</TableCell>

              <TableCell>{transaction.appointmentDate}</TableCell>

              <TableCell className="font-medium">
                ${transaction.amount.toFixed(2)} {transaction.currency}
              </TableCell>

              <TableCell>
                <span title={transaction.stripeSessionId}>
                  {transaction.stripeSessionId.slice(0, 18)}...
                </span>
              </TableCell>

              <TableCell>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  {transaction.paymentStatus}
                </span>
              </TableCell>

              <TableCell>
                {new Date(transaction.transactionDate).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsTable;
