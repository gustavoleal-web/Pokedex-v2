import react, { useState, useEffect } from 'react';
import axios from 'axios';

const Pokedex = ( { id } ) => {

    const [ state, setState ] = useState( [] )
    useEffect( () => {
        console.log( 'useEffect2 Ran' )


        const fetchData = async () => {
            try {
                let pokemon = await axios.get( `https://pokeapi.co/api/v2/pokemon/${ id }` )
                let pokemonEntries = pokemon.data;
                setState( pokemonEntries );
            }
            catch ( e ) {
                console.log( e );
            }
        }
        fetchData();

    }, [] )

    return (
        <div>
            { Object.keys( state ).length === 0 ? <h1>Loading...</h1> :
                <div>
                    <p>{ state.name }</p>
                    <img src={ `${ state.sprites.front_default }` } />
                </div>
            }
        </div>
    )
}

export default Pokedex;