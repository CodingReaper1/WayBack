import { useNavigate } from "react-router-dom";
import useLoginContext from "../../context/useLoginContext";
import { useUser } from "./useUser";
import { useEffect } from "react";
import Fallback from "../../ui/Fallback";

function Confirm() {
  console.log("xuioznaet");
  const { signIn } = useLoginContext();
  const { isAuthenticated, user, refetch } = useUser();
  const navigate = useNavigate();
  console.log(isAuthenticated);
  useEffect(() => {
    if (user) {
      navigate(`/map/${user.id}`);
      signIn();
    } else {
      // console.log("error on confirm page");
      // refetch();
    }
  }, [isAuthenticated, user, navigate, signIn, refetch]);

  return <Fallback />;
}

export default Confirm;
