import React, { useEffect, useState } from 'react';
import EvolvesTo from './EvolvesTo.js/EvolvesTo'

import axios from 'axios';

const EvolutionChain = ( { name, clickedPoke } ) => {
    const [ url, setUrl ] = useState( '' );

    useEffect( () => {
        const fetchData = async () => {
            try {
                let pokemon = await axios.get( `https://pokeapi.co/api/v2/pokemon-species/${ name }` )
                let pokemonEntries = pokemon.data.evolution_chain;
                setUrl( pokemonEntries );
            }
            catch ( e ) {
                console.log( e );
            }
        }
        fetchData();

    }, [ name ] );


    return (
        <div>
            {url ? <EvolvesTo url={ url.url } clickedPoke={clickedPoke}/> : null }
        </div>
    )
}

export default React.memo( EvolutionChain );