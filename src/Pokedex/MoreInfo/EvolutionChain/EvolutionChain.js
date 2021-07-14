import React, { useEffect, useRef, useState } from 'react';
import filterEvolutionsTriggers from './filterEvolutionsTriggers';
import EvosMethods from './EvosMethods/EvosMethods';
import axios from 'axios';

const EvolutionChain = ( { evolutionChainUrl, clickedPoke, id } ) => {
    const isMounted = useRef( false );
    const [ methods, setMethods ] = useState( [] );
    const [ error, setError ] = useState( false );

    useEffect( () => {
        isMounted.current = true;
        const fetchData = async () => {
            if ( isMounted.current ) {
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
                    setError( true )
                }
            }
        }
        fetchData();
        return () => {
            isMounted.current = false;
        };

    }, [ evolutionChainUrl ] );

    if ( error ) {
        return <h6>Something went wrong. Try again later.</h6>
    }

    else if ( methods.length === 0 ) {
        return <p>This Pokemon does not evolve.</p>
    }

    else {
        return <EvosMethods methods={ methods } clickedPoke={ clickedPoke } id={ id } />
    }
}

export default EvolutionChain;