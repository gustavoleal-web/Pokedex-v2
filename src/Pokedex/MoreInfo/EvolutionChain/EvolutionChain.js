import React, { useEffect, useState } from 'react';
import filterEvolutionsTriggers from './filterEvolutionsTriggers';
import EvosMethods from './EvosMethods/EvosMethods';
import axios from 'axios';

const EvolutionChain = ( { evolutionChainUrl, clickedPoke } ) => {
    // const [ state, setState ] = useState( [] );
    const [ methods, setMethods ] = useState( [] );

    useEffect( () => {
        const fetchData = async () => {

            let evosAndAlternative;
            try {
                let pokemon = await axios.get( evolutionChainUrl );
                let fetchedEvoChain = pokemon.data.chain;

                // pokeEvoLine = setEvoChain( fetchedEvoChain );
                // setState( pokeEvoLine );


                //testing all evolutions and alternative evolutions
                evosAndAlternative = filterEvolutionsTriggers( fetchedEvoChain );
                setMethods( evosAndAlternative );
              
            }
            catch ( e ) {
                console.log( e );
            }

        }
        fetchData();

    }, [ evolutionChainUrl ] );

    if ( methods.length === 0 ) {
        return <p>This Pokemon does not evolve.</p>
    }

    else {
        return <EvosMethods methods={ methods } clickedPoke={ clickedPoke } />
    }


}


export default EvolutionChain;