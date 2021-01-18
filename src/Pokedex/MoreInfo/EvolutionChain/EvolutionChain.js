import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EvolutionChain = ( { evolutionChainUrl, clickedPoke } ) => {
    const [ state, setState ] = useState( [] );
    useEffect( () => {
        const fetchData = async () => {
            const pokeEvoLine = [];
            try {
                let pokemon = await axios.get( evolutionChainUrl )
                let pokemonEntries = pokemon.data.chain;

                //first evolution
                if ( pokemonEntries.evolves_to.length !== 0 ) {
                    pokeEvoLine.push( pokemonEntries.species.name );
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

    }, [ evolutionChainUrl ] );

    return (
        <div>
       
            {state.length === 0
                ? <p>This Pokemon does not evolve.</p>
                : state.map( pokemonEvo =>
                    <p onClick={ () => clickedPoke( pokemonEvo ) }
                        style={ { display: 'flex', color: 'blue' } }
                        key={ pokemonEvo }>
                        { pokemonEvo }
                    </p> )
            }
        </div>
    )
}

export default EvolutionChain;