import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useUser } from "../hooks/useUser";

type ProtectedRouteTypes = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteTypes) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();
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
