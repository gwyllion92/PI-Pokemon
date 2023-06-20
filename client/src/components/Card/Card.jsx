import style from "./Card.module.css";


const Card = (props) => {
    return(
        <div className={style.card}>
            <h2>{props.name}</h2>
            <img src={props.image} alt={props.name} />
            <p></p>
            <p>{props.types.join(", ")}</p>

        </div>
    )
}


export default Card;