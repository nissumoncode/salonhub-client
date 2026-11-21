"use client";

import { useEffect, useState } from "react";
import BackToHome from "@/components/BackToHome";
import {
  getAllCustomers,
  updateCustomerBlockStatus,
  type Customer,
} from "@/services/userApi";

import UserTable from "../components/UserTable";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ManageUsersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getAllCustomers()
      .then((data) => {
        if (isMounted) {
          setCustomers(data);
          setError("");
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Failed to load customers.");
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

  const handleBlockToggle = async (id: string, isBlocked: boolean) => {
    try {
      setUpdatingId(id);
      setError("");

      await updateCustomerBlockStatus(id, isBlocked);

      setCustomers((previousCustomers) =>
        previousCustomers.map((customer) =>
          customer._id === id ? { ...customer, isBlocked } : customer,
        ),
      );
    } catch {
      setError("Failed to update customer status.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <BackToHome />
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">
            Manage Users
          </CardTitle>
          <CardDescription>
            View customers and manage their account access.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="py-6 text-center text-muted-foreground">
              Loading customers...
            </p>
          ) : error && customers.length === 0 ? (
            <p className="py-6 text-center text-destructive">{error}</p>
          ) : (
            <>
              {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

              <UserTable
                customers={customers}
                onBlockToggle={handleBlockToggle}
                updatingId={updatingId}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageUsersPage;
