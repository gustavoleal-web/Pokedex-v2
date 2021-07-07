import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const AlternateForms = ( { pokeForms } ) => {
    const isMounted = useRef(false);
    const [ alternatives, setAlternatives ] = useState( '' );
    let formName = 'normal';

    useEffect( () => {
       isMounted.current = true;

        const fetchData = async () => {
            if ( isMounted ) {
                try {
                    let pokemon = await axios.get( `${ pokeForms.url }` )
                    let fetchedPokeForm = pokemon.data;
                    setAlternatives( fetchedPokeForm );
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

    }, [ pokeForms ] )

    if ( alternatives.form_name ) {
        formName = alternatives.form_name;
    }

    return (
        <>
            {
                alternatives
                    ? <div>
                        <p style={ { textAlign: 'center' } }>{ formName }</p>
                        <img src={ `${ alternatives.sprites.front_default }` } alt={ `${ alternatives.form_name }` } />
                    </div>
                    : null
            }
        </>


    )
}

export default React.memo( AlternateForms );