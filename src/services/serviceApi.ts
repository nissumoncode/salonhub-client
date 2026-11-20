import api from "@/lib/api";
import type { Service } from "@/types/service";

// Get all services
export const getServices = async (): Promise<Service[]> => {
  const response = await api.get("/services");
  return response.data;
};

// Get single service by ID
export const getServiceById = async (id: string): Promise<Service> => {
  const response = await api.get(`/services/${id}`);
  return response.data;
};

type ServiceInput = Omit<Service, "_id">;

// Add new service
export const createService = async (data: ServiceInput) => {
  const response = await api.post("/services", data);
  return response.data;
};

// Update service
export const updateService = async (id: string, data: ServiceInput) => {
  const response = await api.put(`/services/${id}`, data);
  return response.data;
};

// Delete service
export const deleteService = async (id: string) => {
  const response = await api.delete(`/services/${id}`);
  return response.data;
};

// Upload service image
export const uploadServiceImage = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", image);
  const response = await api.post("/services/upload-image", formData);
  return response.data.imageUrl;
};
