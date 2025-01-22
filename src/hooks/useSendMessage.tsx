import { useState } from "react";

export function useSendMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ result: string; threadId: string }>({
    result: "",
    threadId: "",
  });

  const sendMessage = async (
    url: string,
    queryParams: { message: string; threadId?: string }
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams({
      message: queryParams.message,
      threadId: queryParams.threadId || "",
    }).toString();

    const urlApi = `${url}?${params}`;

    try {
      const response = await fetch(urlApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error response! status: ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, data, sendMessage };
}
