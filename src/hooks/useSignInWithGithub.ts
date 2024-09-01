import { useMutation } from "@tanstack/react-query";
import { signInWithGithubApi } from "../services/apiDatabase";
import toast from "react-hot-toast";

function useSignInWithGithub() {
  const { data: githubUserData, mutate: signInWithGithub } = useMutation({
    mutationKey: ["signInWithGithub"],
    mutationFn: signInWithGithubApi,
    onError: (err) => {
      toast.error(`Error: ${err.message}`);
    },
  });

  return { signInWithGithub, githubUserData };
}

export default useSignInWithGithub;
