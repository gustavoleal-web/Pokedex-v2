import React, { useEffect, useState } from 'react';
import setEvoChain from './setEvoChain';
import testingAllEvos from './testingAllEvos';
import EvosMethods from './evosMethods';
import axios from 'axios';

const EvolutionChain = ( { evolutionChainUrl, clickedPoke } ) => {
    const [ state, setState ] = useState( [] );
    const [ methods, setMethods ] = useState( [] );

    useEffect( () => {
        const fetchData = async () => {
            let pokeEvoLine;
            let evosAndAlternative;
            try {
                let pokemon = await axios.get( evolutionChainUrl );
                let fetchedEvoChain = pokemon.data.chain;

                pokeEvoLine = setEvoChain( fetchedEvoChain );
                setState( pokeEvoLine );

                //testing all evolutions and alternative evolutions
                evosAndAlternative = testingAllEvos( fetchedEvoChain );
                setMethods( evosAndAlternative );
            }
            catch ( e ) {
                console.log( e );
            }

        }
        fetchData();

    }, [ evolutionChainUrl ] );

    return (
        <div>

            {/*state.length === 0
                ? <p>This Pokemon does not evolve.</p>
                : state.map( pokemonEvo =>
                    <p onClick={ () => clickedPoke( pokemonEvo ) }
                        style={ { display: 'flex', color: 'blue' } }
                        key={ pokemonEvo }>
                        { pokemonEvo }
                    </p> )
                */ }

            <EvosMethods methods={ methods }/>
        </div>
    )
}

export default EvolutionChain;