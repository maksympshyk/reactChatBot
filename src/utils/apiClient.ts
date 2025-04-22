import axios from "axios";

const BASE_URL = "https://chat-cib-backend.synergy-impact.de/chat";
const BEARER_TOKEN = "Bearer Bearer cloud-ib-chat";

interface ApiResponse {
  id: string;
  timestamp: string;
  content: any[];
  debug: Record<string, any>;
}

export const apiCall = async (
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  data?: any,
  sublink: string = ""
): Promise<ApiResponse> => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${sublink}`,
      headers: {
        Authorization: BEARER_TOKEN,
        "Content-Type": "application/json"
      },
      data: data
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        data: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText
      };
    }
    throw error;
  }
};

// Example usage:
// const getData = async () => {
//   try {
//     const response = await apiCall<YourDataType>('GET', '/your-endpoint');
//     console.log(response.data);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };
