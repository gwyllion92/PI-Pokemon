import { useState, useEffect } from "react";
import { getTypes } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import axios from "axios";
import style from "./Form.module.css"


const Form = () => {
    const dispatch = useDispatch(); //RECORDA PARA "EJECUTAR" LAS ACTIONS NECESITÁS DISPATCH Y USESELECTOR
    const types = useSelector((state) => state.types);

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch])
      

    const [form, setForm] = useState({
        name: "", 
        img:"",
        health: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        type: []
    });

    const [imageURL, setImageURL] = useState("");

    const [errors, setErrors ] = useState({
        name: "",
        img:"",
        health: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "", 
        type: []
    })

    const changeHandler = (event) => {
        const property = event.target.name; //el nombre de quién disparó el evento
        const value = event.target.value;
        validate({...form, [property]: value});

        setForm({...form, [property]: value}) //ahora si vemos lo que escribimos en el cliente y en el estado
    };

    const typesHandler = (event) => {
        const selectedTypes = event.map((option) => option.value);
      setForm({ ...form, type: selectedTypes });
    };

    const validate = (form) => {
        setErrors((prevErrors) => {
          const updatedErrors = { ...prevErrors };
      
          if (form.name.length < 5) {
            updatedErrors.name = "The name must contain at least five letters";
          } else {
            updatedErrors.name = "";
          }
      
          if (isNaN(form.health)) {
            updatedErrors.health = "The health must be a number";
          } else {
            updatedErrors.health = "";
          }
      
          if (isNaN(form.attack)) {
            updatedErrors.attack = "The attack must be a number";
          } else {
            updatedErrors.attack = "";
          }
      
          if (isNaN(form.defense)) {
            updatedErrors.defense = "The defense must be a number";
          } else {
            updatedErrors.defense = "";
          }
      
          if (isNaN(form.speed)) {
            updatedErrors.speed = "The speed must be a number";
          } else {
            updatedErrors.speed = "";
          }
      
          if (isNaN(form.height)) {
            updatedErrors.height = "The height must be a number";
          } else {
            updatedErrors.height = "";
          }
      
          if (isNaN(form.weight)) {
            updatedErrors.weight = "The weight must be a number";
          } else {
            updatedErrors.weight = "";
          }
      
          return updatedErrors;
        });
      };

    const typeOptions = types.map((type) => ({
      label: type.name,
      value: type.id,
    }));

    const submitHandler = (event) => {
      console.log(form);

      event.preventDefault();
      axios.post("http://localhost:3001/pokemons/", form)
      .then(res => alert(res))
    }
      

    return(
        <div>
            <form>
                <div>
                    <label>Name:  </label>
                    <input type="text" value={form.name} onChange={changeHandler} name="name" />
                    {errors.name && <span>{errors.name}</span>}
                </div>

                <div>
                    <label>Health:  </label>
                    <input type="text" value={form.health} onChange={changeHandler} name="health" />
                    {errors.health && <span>{errors.health}</span>}
                </div>

                <div>
                    <label>Attack:  </label>
                    <input type="text"  value={form.attack} onChange={changeHandler} name="attack" />
                    {errors.attack && <span>{errors.attack}</span>}
                </div>

                <div>
                    <label>Defense: </label>
                    <input type="text" value={form.defense} onChange={changeHandler} name="defense" />
                    {errors.defense && <span>{errors.defense}</span>}
                </div>

                <div>
                    <label>Speed:  </label>
                    <input type="text" value={form.speed} onChange={changeHandler} name="speed" />
                    {errors.speed && <span>{errors.speed}</span>}
                </div>

                <div>
                    <label>Height(cm):  </label>
                    <input type="text" value={form.height} onChange={changeHandler} name="height" />
                    {errors.height && <span>{errors.height}</span>}
                </div>

                <div>
                    <label>Weight:  </label>
                    <input type="text" value={form.weight} onChange={changeHandler} name="weight" />
                    {errors.weight && <span>{errors.weight}</span>}
                </div>
                <br />
                <div>
                    <label>Image: </label>
                    <input type="file" name="img" />
                    {imageURL && <img src={imageURL} alt="Selected" />}
                    <></>
                </div>
                <br />
                <div>
                  <Select options = {typeOptions} onChange={typesHandler} isMulti />
                </div>
                <br />
                    
                <span>If 'Speed', 'Height' or 'Weight' are left empty they will be assigned as unknown by default</span>
            </form>
            <br></br>
            <button type="submit" onClick={submitHandler} >Submit</button>
        </div>
    )
}


export default Form;