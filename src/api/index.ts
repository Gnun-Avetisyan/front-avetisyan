import { HTTPMethods } from "../types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default async function fetchHttp<T>(method: HTTPMethods): Promise<T> {
  try {
    const response = await fetch(BASE_URL, { method });

    if (!response.ok) {
      throw new Error(
        `request error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("error in fetchHttp:", error);
    throw error;
  }
}
