import style from "./Card.module.css";


const Card = (props) => {
    const typeClass = props.types[0].toLowerCase();

    return(
        <div className={`${style.card} ${style[typeClass]}`}>
            <h2>{props.name}</h2>
            <img src={props.image} alt={props.name} />
            <p></p>
            <p>{props.types.join(", ")}</p>

        </div>
    )
}


export default Card;