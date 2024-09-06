import supabase from "./supabase";

const MAINURL = "https://waybackk.netlify.app";
// const MAINURL = "http://localhost:5173";

type LogInTypes = {
  email: string;
  password: string;
};

type CreateAccountTypes = {
  firstName: string;
  email: string;
  password: string;
};

type ResetPasswordTypes = {
  password: string;
  retrievedEmail: string;
};

export async function logInApi({ email, password }: LogInTypes) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(`Error: ${error.message}`);

  return data;
}

export async function logoutApi() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(`Error: ${error.message}`);
}

export async function getCurrentUserApi() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(`Error: ${error.message}`);

  return data?.user;
}

export async function resetPasswordApi({
  password,
  retrievedEmail,
}: ResetPasswordTypes) {
  const { data, error } = await supabase.auth.updateUser({
    email: retrievedEmail,
    password: password,
  });
  console.log(data);

  if (error) throw new Error(error.message);

  return data;
}

export async function sendResetPasswordEmailApi(email: string) {
  const { data: userData, error: userError } =
    await supabase.auth.admin.listUsers();

  if (!userData.users.some((user) => user.email === email))
    throw new Error(`Theres nobody registered with that email`);

  if (userError) throw new Error(userError.message);

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${MAINURL}/reset-password?email=${encodeURIComponent(email)}`,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function createAccountApi({
  firstName,
  email,
  password,
}: CreateAccountTypes): Promise<{ user: { id: string } }> {
  // const allAccounts = await readAccounts();
  // const emailAlreadyUsed = allAccounts.some(
  //   (account) => account.email === accountData.email,
  // );
  // if (emailAlreadyUsed)
  //   throw new Error("Error: Email has been used on website");
  // const { data, error } = await supabase
  //   .from("authentication")
  //   .insert({ ...accountData })
  //   .select();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName,
        displayName: firstName,
      },
      emailRedirectTo: `${MAINURL}/confirm`,
    },
  });

  if (error) throw new Error(`Error: ${error.message}`);

  if (!data.user || !data.user.id) {
    throw new Error("Error: No user ID returned");
  }

  return { user: { id: data.user.id } };
}

export async function signInWithGithubApi() {
  const {
    // data, (seems nothing important)
    error,
  } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${MAINURL}/confirm`,
    },
  });

  if (error) throw new Error(`Error: ${error.message}`);
}

export async function updateUserApi() {
  // if (user) {
  //   const { error: updateError } = await supabase.auth.updateUser({
  //     data: {
  //       firstName: "John",
  //     },
  //   });
  //   if (updateError)
  //     throw new Error(`Error updating user: ${updateError.message}`);
  // }
}
