import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AlternateForms = ( { forms } ) => {
        const [ alternatives, setAlternatives ] = useState( '' );


    useEffect( () => {
        const fetchData = async () => {
            try {
                let pokemon = await axios.get( `${ forms }` )
                let pokemonEntries = pokemon.data;
                setAlternatives( pokemonEntries );

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
                   <p style={{textAlign: 'center'}}>{alternatives.form_name}</p>
                   <img src={`${alternatives.sprites.front_default}`} alt={`${alternatives.form_name}`} />
                </div>
                : null }
        </>


    )
}

export default React.memo( AlternateForms );