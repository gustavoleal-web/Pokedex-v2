import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AlternateForms = ( { forms } ) => {
   //this component will only return the first form
   //update it to return all forms
    const [ alternatives, setAlternatives ] = useState( '' );

    useEffect( () => {
        const fetchData = async () => {
            try {
                let pokemon = await axios.get( `${ forms[ 1 ].url }` )
                let pokemonEntries = pokemon.data;
                setAlternatives( pokemonEntries )

            }
            catch ( e ) {
                console.log( e );
            }
        }
        fetchData();

    }, [ forms ] )

    return (
        <>
            {alternatives
                ? <div>
                    <p>{ alternatives.names[ 1 ].name }</p>
                    <img src={ `${ alternatives.sprites.front_default }` } alt="" />
                </div>
                : null }
        </>


    )
}

export default AlternateForms;