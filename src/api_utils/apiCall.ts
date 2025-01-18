export async function apiCall(endpoint: string, method = "GET", headers = {}, payload: object | null = null) {
  try {
    const response = await fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: method !== "GET" && payload ? JSON.stringify(payload) : null,
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse and return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
}