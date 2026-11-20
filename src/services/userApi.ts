import api from "@/lib/api";

export interface Customer {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  createdAt: string;
}

export const getAllCustomers = async (): Promise<Customer[]> => {
  const response = await api.get("/users");
  return response.data;
};

export const updateCustomerBlockStatus = async (
  id: string,
  isBlocked: boolean,
) => {
  const response = await api.patch(`/users/${id}/block`, {
    isBlocked,
  });

  return response.data;
};
