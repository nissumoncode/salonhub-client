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
      <div className="rounded-lg border bg-white p-6 text-center text-gray-500">
        No customers found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F5EBDD] hover:bg-[#F5EBDD]">
            <TableHead className="text-[#4A382E]">Customer</TableHead>
            <TableHead className="text-[#4A382E]">Email</TableHead>
            <TableHead className="text-[#4A382E]">Joined</TableHead>
            <TableHead className="text-[#4A382E]">Status</TableHead>
            <TableHead className="text-[#4A382E]">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer._id}>
              <TableCell className="font-medium text-[#4A382E]">
                {customer.name || "N/A"}
              </TableCell>

              <TableCell className="text-[#6B5B50]">{customer.email}</TableCell>

              <TableCell className="text-[#6B5B50]">
                {customer.createdAt
                  ? new Date(customer.createdAt).toLocaleDateString()
                  : "N/A"}
              </TableCell>

              <TableCell>
                <span
                  className={
                    customer.isBlocked
                      ? "rounded-full bg-red-100 px-3 py-1 text-xs text-red-700"
                      : "rounded-full bg-green-100 px-3 py-1 text-xs text-green-700"
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
