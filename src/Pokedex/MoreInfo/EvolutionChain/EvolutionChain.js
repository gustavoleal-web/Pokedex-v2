import React, { useEffect, useRef, useState } from 'react';
import filterEvolutionsTriggers from './filterEvolutionsTriggers';
import EvosMethods from './EvosMethods/EvosMethods';
import axios from 'axios';

const EvolutionChain = ( { evolutionChainUrl, clickedPoke, id } ) => {
    const isMounted = useRef( false );
    const [ methods, setMethods ] = useState( [] );

    useEffect( () => {
        isMounted.current = true;
        const fetchData = async () => {
            if ( isMounted ) {
                let evosAndAlternative;
                try {
                    let pokemon = await axios.get( evolutionChainUrl );
                    let fetchedEvoChain = pokemon.data.chain;

                    //testing all evolutions and alternative evolutions
                    if ( fetchedEvoChain !== undefined ) {
                        evosAndAlternative = filterEvolutionsTriggers( fetchedEvoChain );
                        setMethods( evosAndAlternative );
                    }

                }
                catch ( e ) {
                    console.log( e );
                }
            }
        }
        fetchData();
        return () => {
            isMounted.current = false;
        };

    }, [ evolutionChainUrl ] );

    if ( methods.length === 0 ) {
        return <p>This Pokemon does not evolve.</p>
    }

    else {
        return <EvosMethods methods={ methods } clickedPoke={ clickedPoke } id={ id } />
    }


}


export default EvolutionChain;