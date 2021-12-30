import React from "react";
import style from "./NavBar.module.css";

const url = [
  "https://dp.profilepics.in/profile_pictures/real-desi-girls/desi-girl-dp-pic-02.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz2g46nMoPGST-YnukUgTUVQD03uqOWN0Njg&usqp=CAU",
];

const NavBar = () => {
  return (
    <nav className={style.navbar}>
      <h1 className={style.logo}>FriendsBook</h1>
      <div className={style["profile-menu"]}>
        <div className={style.profile}>
          <img src={url[1]} alt="pic" className={style["profile-pic"]} />
          <span>Priyanka</span>
        </div>
        <span>
          <a href="#" title="Logout" className={style.logout}>
            <i className="fas fa-sign-out-alt "></i>
          </a>
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
