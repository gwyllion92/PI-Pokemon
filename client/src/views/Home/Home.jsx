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
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    useEffect(() => {
        dispatch(getPokemons());
    }, [])

    useEffect(() => {
        if (searchTerm !== "") {
          const filtered = allPokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredPokemons(filtered);
        } else {
          setFilteredPokemons(allPokemons);
        }
      }, [searchTerm, allPokemons]);

    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return(
        <div>
            <div>                
                <CardsContainer currentPage={currentPage} pokemonsPerPage={pokemonsPerPage} pokemons={filteredPokemons} />
            </div>

            <div>
                <Pagination 
                    pokemonsPerPage={pokemonsPerPage}
                    totalPokemons={filteredPokemons.length}
                    paginate={paginate}
                />
            </div>

        </div>
    )
}


export default Home;