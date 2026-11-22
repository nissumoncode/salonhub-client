"use client";

import type { Customer } from "@/services/userApi";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserTableProps {
  customers: Customer[];
  onBlockToggle: (id: string, isBlocked: boolean) => void;
  updatingId: string | null;
}

const UserTable = ({
  customers,
  onBlockToggle,
  updatingId,
}: UserTableProps) => {
  if (customers.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-4 sm:p-6 text-center text-muted-foreground">
        No customers found.
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 overflow-x-auto rounded-xl border bg-card">
      <Table className="min-w-[650px]">
        <TableHeader>
          <TableRow className="bg-secondary hover:bg-secondary">
            <TableHead className="text-foreground">Customer</TableHead>
            <TableHead className="text-foreground">Email</TableHead>
            <TableHead className="text-foreground">Joined</TableHead>
            <TableHead className="text-foreground">Status</TableHead>
            <TableHead className="text-foreground">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer._id}>
              <TableCell className="font-medium text-foreground">
                {customer.name || "N/A"}
              </TableCell>

              <TableCell className="text-muted-foreground">{customer.email}</TableCell>

              <TableCell className="text-muted-foreground">
                {customer.createdAt
                  ? new Date(customer.createdAt).toLocaleDateString()
                  : "N/A"}
              </TableCell>

              <TableCell>
                <span
                  className={
                    customer.isBlocked
                      ? "rounded-full bg-destructive/10 px-3 py-1 text-xs text-destructive"
                      : "rounded-full bg-green-500/15 px-3 py-1 text-xs text-green-600 dark:text-green-400"
                  }
                >
                  {customer.isBlocked ? "Blocked" : "Active"}
                </span>
              </TableCell>

              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={updatingId === customer._id}
                  onClick={() =>
                    onBlockToggle(customer._id, !customer.isBlocked)
                  }
                >
                  {updatingId === customer._id
                    ? "Updating..."
                    : customer.isBlocked
                      ? "Unblock"
                      : "Block"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;

