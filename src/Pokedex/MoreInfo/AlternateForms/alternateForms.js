import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AlternateForms = ( { pokeForms } ) => {
    const [ alternatives, setAlternatives ] = useState( '' );
    
    useEffect( () => {
        const fetchData = async () => {
            try {
                let pokemon = await axios.get( `${ pokeForms.url }` )
                let fetchedPokeForm = pokemon.data;
                setAlternatives( fetchedPokeForm );
            }
            catch ( e ) {
                console.log( e );
            }
        }
        fetchData();

    }, [ pokeForms ] )

    return (
        <>
            {
                alternatives
                    ? <div>
                        <p style={ { textAlign: 'center' } }>{ alternatives.form_name }</p>
                        <img src={ `${ alternatives.sprites.front_default }` } alt={ `${ alternatives.form_name }` } />
                    </div>
                    : null
            }
        </>


    )
}

export default React.memo( AlternateForms );