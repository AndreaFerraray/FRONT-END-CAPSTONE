import { useDispatch, useSelector } from "react-redux";
import { addRole, addUser } from "../redux/action";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.login.token);

  const fetchAuth = async () => {
    const rispostaSucces = await fetch("http://localhost:3001/users/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (rispostaSucces.ok) {
      const user = await rispostaSucces.json();
      console.log(user);
      dispatch(addRole(user.role));
      dispatch(addUser(user));
      navigate("/profile");
    } else {
      //componente per errori
    }
  };
  useEffect(() => {
    fetchAuth();
  }, []);

  return <></>;
};
export default Auth;
