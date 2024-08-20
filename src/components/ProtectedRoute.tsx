import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

import { useEffect } from "react";
import { useUser } from "../hooks/useUser";

type ProtectedRouteTypes = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteTypes) {
  // const { isAuthenticated } = useAuth();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     toast.error("Log in your account first");
  //     navigate("/");
  //   }
  // }, [isAuthenticated, navigate]);
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();
  // console.log("reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/homepage");
    },
    [isLoading, isAuthenticated, navigate],
  );

  if (isLoading) return <p>Loading...</p>;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
