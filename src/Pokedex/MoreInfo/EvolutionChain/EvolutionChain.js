import React, { useEffect, useState } from 'react';
import EvolvesTo from './EvolvesTo.js/EvolvesTo'
import Varieties from './Varieties/Varieties';
import axios from 'axios';

const EvolutionChain = ( { name, clickedPoke } ) => {
    const [ evolutionChainUrl, setUrl ] = useState( '' );
    const [ varieties, setVarieties ] = useState( '' );

    switch ( name ) {
        case 'deoxys-normal':
            name = 'deoxys';
            break;
        case 'keldeo-ordinary':
            name = 'keldeo';
            break;
        case 'keldeo-resolute':
            name = 'keldeo';
            break;
        case 'shaymin-land':
            name = 'shaymin';
            break;
        case 'giratina-altered':
            name = 'giratina'
            break;
        case 'wormadam-plant':
            name = 'wormadam';
            break;
        default:
            break;

    }

    useEffect( () => {
        const fetchData = async () => {
            try {
                let pokemon = await axios.get( `https://pokeapi.co/api/v2/pokemon-species/${ name }` )
                let pokemonEntries = pokemon.data.evolution_chain;
                pokemon.data.varieties ? setVarieties( pokemon.data.varieties ) : setVarieties( '' )
                setUrl( pokemonEntries.url );
                console.log(pokemon.data.varieties)

            }
            catch ( e ) {
                console.log( e );
            }
        }
        fetchData();

    }, [ name ] );


    return (
        <div>
            {evolutionChainUrl ? <EvolvesTo evolutionChainUrl={ evolutionChainUrl } clickedPoke={ clickedPoke } /> : null }
            {varieties.length === 0 ? null : <Varieties otherForms={ varieties } /> }
        </div>
    )
}

export default React.memo( EvolutionChain );