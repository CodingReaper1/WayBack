import toast from "react-hot-toast";

const API_KEY: string = import.meta.env.VITE_VERIFYEMAIL_API_KEY;

async function validateEmailExistsApi(email: string) {
  try {
    const response = await fetch(
      `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${API_KEY}`,
    );

    if (!response.ok) throw new Error("Error reciving response");

    const result = await response.json();

    if (result?.message) throw new Error(`Error: ${result?.message}`);

    return result;
  } catch (err) {
    const error = err as Error;
    toast.error(`Error: ${error.message}`);
    console.error(`Error: ${error.message}`);
    return {};
  }
}

export default validateEmailExistsApi;
