"use client";

import { useState } from "react";
import Heading from "../../../../../ui/Heading";
import Text from "../../../../../ui/Text";

interface Transaction {
  id: number;
  description: string;
  date: string;
  amount: number;
}

interface BudgetTransactionListProps {
  transactions: Transaction[];
}

export default function BudgetTransactionList({
  transactions,
}: BudgetTransactionListProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedTransactions = showAll
    ? transactions
    : transactions.slice(0, 5);
  const hasMore = transactions.length > 5;

  return (
    <div className="border rounded-[1rem] p-[1rem] lg:p-[2.1rem] border-border">
      <Heading className="text-[1.6rem] font-bold text-text-secondary mb-[2rem]">
        Recent Transactions
      </Heading>
      <div className="space-y-[1.6rem]">
        {displayedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center"
          >
            <div className="flex flex-col gap-[0.4rem]">
              <Text className="text-[1.4rem] font-bold text-text-secondary">
                {transaction.description}
              </Text>
              <Text className="text-[1.2rem] text-text-primary font-medium">
                {transaction.date}
              </Text>
            </div>
            <Text className="text-[1.4rem] font-bold text-text-secondary">
              £{transaction.amount.toFixed(2)}
            </Text>
          </div>
        ))}

        {hasMore && !showAll && (
          <div className="flex justify-center pt-[0.8rem]">
            <button
              onClick={() => setShowAll(true)}
              className="text-[1.4rem] font-bold text-brand-primary hover:opacity-80 transition-opacity"
            >
              View All Transactions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
