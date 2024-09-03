import { useNavigate } from "react-router-dom";
import useLoginContext from "../context/useLoginContext";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";

function Confirm() {
  const { signIn } = useLoginContext();
  const { isAuthenticated, user, refetch } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate(`/map/${user.id}`);
      signIn();
    } else {
      // console.log("error on confirm page");
      // refetch();
    }
  }, [isAuthenticated, user, navigate, signIn, refetch]);

  return <div>Loading... i guess</div>;
}

export default Confirm;
