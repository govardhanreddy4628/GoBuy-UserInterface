import toast from "react-hot-toast";
import { PUT } from "../api/api_utility"; // adjust path

interface ProfilePicResponse {
  success: boolean;
  message: string;
  data?: {
    profilePicUrl: string;
  };
}

const uploadProfilePic = async (file: File): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("profilePic", file);

    const response = await PUT<ProfilePicResponse>(
      "/api/user/profile-pic",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      toast.success("Profile picture updated!");
    } else {
      toast.error(response.data.message);
    }
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message || "Failed to upload profile picture"
    );
  }
};

export default uploadProfilePic;