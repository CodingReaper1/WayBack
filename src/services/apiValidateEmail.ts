const API_KEY: string = import.meta.env.VITE_VERIFYEMAIL_API_KEY;

async function validateEmailExistsApi(email: string) {
  try {
    const response = await fetch(
      `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${API_KEY}`,
    );
    const result = await response.json();

    return result;
  } catch (error: unknown) {
    return "Error verifying email";
  }
}

export default validateEmailExistsApi;
