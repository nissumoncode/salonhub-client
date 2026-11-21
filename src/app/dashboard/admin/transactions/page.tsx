"use client";

import { useEffect, useState } from "react";
import BackToHome from "@/components/BackToHome";
import { getAllTransactions } from "@/services/transactionApi";
import type { Transaction } from "@/types/transaction";
import TransactionsTable from "../components/TransactionsTable";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getAllTransactions()
      .then((data) => {
        if (isMounted) {
          setTransactions(data);
          setError("");
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Failed to load transactions.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6 p-6">
      <BackToHome />

      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Payment Transactions
        </h1>
        <p className="mt-1 text-muted-foreground">
          View all customer payment transactions.
        </p>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading transactions...</p>
      ) : error ? (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      ) : (
        <TransactionsTable transactions={transactions} />
      )}
    </div>
  );
};

export default TransactionsPage;
