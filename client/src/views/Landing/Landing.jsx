import { Link } from "react-router-dom";
import styles from "./Landing.module.css"


const Landing = () => {
    return(
        <div className={styles.container} >
            <h2 className={styles.textEffect} >Welcome to our Pokemon page! Explore, learn and create your own Pokémon. Enjoy the adventure!</h2>
            <Link to="/home" >
                <button>Start!</button>
            </Link>
        </div>
    )
}


export default Landing;