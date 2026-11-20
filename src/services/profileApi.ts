import api from "@/lib/api";

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  image?: string;
  phoneNumber?: string;
  role: string;
}

export const getMyProfile = async (): Promise<UserProfile> => {
  const response = await api.get("/profile/me");
  return response.data;
};

export const updateMyProfile = async (data: {
  name?: string;
  image?: string;
  phoneNumber?: string;
}) => {
  const response = await api.patch("/profile/me", data);
  return response.data;
};
// Upload profile image to ImgBB
export const uploadProfileImage = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", image);

  const response = await api.post("/profile/upload-image", formData);

  return response.data.imageUrl;
};
