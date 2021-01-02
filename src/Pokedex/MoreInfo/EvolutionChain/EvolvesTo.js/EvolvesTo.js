import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EvolvesTo = ( { url, clickedPoke } ) => {

    const [ state, setState ] = useState( [] );

    useEffect( () => {
        const fetchData = async () => {
            const pokeEvoLine = [];
            try {
                let pokemon = await axios.get( url )
                let pokemonEntries = pokemon.data.chain;
               
                pokeEvoLine.push( pokemonEntries.species.name );

                //first evolution
                if ( pokemonEntries.evolves_to.length !== 0 ) {
                    pokeEvoLine.push( pokemonEntries.evolves_to[ 0 ].species.name );
                    //second evolution
                    if ( pokemonEntries.evolves_to[ 0 ].evolves_to.length !== 0 ) {
                        pokeEvoLine.push( pokemonEntries.evolves_to[ 0 ].evolves_to[ 0 ].species.name )
                    }
                }
                setState( pokeEvoLine )
            }
            catch ( e ) {
                console.log( e );
            }
        }
        fetchData();

    }, [ url ] );

    return (
        <div>
            {state.length === 0 
                ? null 
                : state.map( pokemon => <p onClick={ () => clickedPoke( pokemon ) } style={ { display: 'flex', color: 'blue' } } key={ pokemon }>{ pokemon }</p> ) }
        </div>
    )
}

export default EvolvesTo;