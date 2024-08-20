import supabase from "./supabase";

type LogInTypes = {
  email: string;
  password: string;
};

type CreateAccountTypes = {
  firstName: string;
  email: string;
  password: string;
};

export async function logInApi({ email, password }: LogInTypes) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(`Error: ${error.message}`);

  return data;
}

export async function getCurrentUserApi() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(`Error: ${error.message}`);

  return data?.user;
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
        // lastName,
        displayName: firstName,
      },
    },
  });

  if (error) {
    throw new Error(`Error: ${error.message}`);
  }

  if (!data.user || !data.user.id) {
    throw new Error("Error: No user ID returned");
  }

  return { user: { id: data.user.id } };
}
