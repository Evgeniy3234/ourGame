import React from "react";
import { Link } from "react-router-dom";
import style from './navbar.module.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NavBar({user, setUser}) {
  console.log(user);
  const navigate = useNavigate();
  const handlerSignOut = async() => {
try {
  const res = await axios.get("http://localhost:3001/auth/signout", {
    withCredentials: true,
  });

  if (res.status === 200) {
    setUser("");
    navigate("/");
  }
} catch (error) {
  console.log(error);
}
  }

  return (
<nav className={style.navbar}>
      <Link className={style.link} to="/">
        Home
      </Link>
      {user.name ? (
        <>
          <div className={style.fakelink} onClick={handlerSignOut}>
            SignOut
          </div>
          <Link className={style.link} to={`/profile/${user.id}`}>
            Profile
          </Link>
        </>
      ) : (
        <>
          <Link className={style.link} to="/signup">
            SignUp
          </Link>
          <Link className={style.link} to="/signin">
            SignIn
          </Link>
        </>
      )}
    </nav>

  );
}
