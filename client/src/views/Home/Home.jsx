import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions";
import Pagination from "../../components/Pagination/Pagination";

const Home = () => {
    const dispatch = useDispatch();

    const allPokemons = useSelector((state) => state.pokemons);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ pokemonsPerPage ] = useState(12);

    useEffect(() => {
        dispatch(getPokemons());
    }, [])

    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return(
        <div>
            <div>                
                <CardsContainer currentPage={currentPage} pokemonsPerPage={pokemonsPerPage} />
            </div>

            <div>
                <Pagination 
                    pokemonsPerPage={pokemonsPerPage}
                    totalPokemons={allPokemons.length}
                    paginate={paginate}
                />
            </div>

        </div>
    )
}


export default Home;