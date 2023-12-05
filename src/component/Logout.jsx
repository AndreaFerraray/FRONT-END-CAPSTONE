import { useDispatch } from "react-redux";
import { addRole, addToken, addUser } from "../redux/action";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "react-bootstrap";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const esci = () => {
    console.log("hey");
    dispatch(addUser(null));
    dispatch(addRole(""));
    dispatch(addToken(""));
    navigate("/");
  };
  useEffect(() => {
    esci();
  }, []);
  return (
    <>
      <Navbar />
    </>
  );
};
export default Logout;
