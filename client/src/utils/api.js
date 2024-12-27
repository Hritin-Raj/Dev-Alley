const BASE_URL = "http://localhost:3000/api";

// FETCH
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

// POST
export const postData = async (endpoint, data) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Parse response JSON only once
    const result = await response.json();

    if (!response.ok) {
      console.error(result.message || "Failed to post data");
      throw new Error(result.message || "Failed to post data");
    }

    return result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};


