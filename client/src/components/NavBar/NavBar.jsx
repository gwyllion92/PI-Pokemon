import { Link } from "react-router-dom";
import React, { useState } from "react";
import style from "./NavBar.module.css";

const NavBar = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Búsqueda:", searchTerm);
        setSearchTerm("");
      };
      

    return(
        <div className={style.mainContainer} >
            <Link to="/home"><button className={style.navBar}>Home</button></Link>
            <form className={style.searchForm} onSubmit={handleSearch}>
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="🔎" />
                <button type="submit">Buscar</button>
            </form>

            <Link to="/create"><button className={style.navBar}>Create</button></Link>
        </div>
    )
}


export default NavBar;