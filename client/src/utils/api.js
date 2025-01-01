const BASE_URL = "http://localhost:3000/api";

// FETCH
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`http://localhost:3000/api/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("result", result);
    return result;
  } catch (error) {
    console.error("API error:", error.message);
    throw error;
  }
};



// export const fetchData = async (endpoint) => {
//   try {
//     const response = await fetch(`${BASE_URL}/${endpoint}`);

//     const result = await response.json();
//     console.log(result);

//     if (!response.ok) {
//       console.error(result.message || "Failed to fetch data");
//       throw new Error(result.message || "Failed to fetch data");
//     }

//     return result;
//   } catch (error) {
//     console.error("API error:", error);
//     throw error;
//   }
// };

// POST
export const postData = async (endpoint, data) => {
  try {
    const url = `${BASE_URL}/${endpoint}`; //.replace(/\/+/g, "/"); // Fix double slashes
    console.log("POST URL:", url); // Log URL to debug
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

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



