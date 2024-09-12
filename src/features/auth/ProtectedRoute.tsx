import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useUser } from "./useUser";
import Fallback from "../../ui/Fallback";

type ProtectedRouteTypes = {
  children: React.ReactNode;
};
console.log("reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

function ProtectedRoute({ children }: ProtectedRouteTypes) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/homepage");
    },
    [isLoading, isAuthenticated, navigate],
  );

  if (isLoading) return <Fallback />;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
