import style from "./Card.module.css";
import { Link } from "react-router-dom";


const Card = (props) => {
    const typeClass = props.types[0].toLowerCase();
    
    console.log(props.id);

    return(
        <div className={`${style.card} ${style[typeClass]}`}>
            <Link to={`/detail/${props.id}`}><h2>{props.name}</h2></Link>
            <img className={style.imagen} src={props.image} alt={props.name} />
            <p></p>
            <p>{props.types.join(", ")}</p>

        </div>
    )
}


export default Card;