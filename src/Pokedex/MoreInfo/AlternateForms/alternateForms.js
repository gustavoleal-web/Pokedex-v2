import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const AlternateForms = ( { pokeForms } ) => {
    const [ alternatives, setAlternatives ] = useState( '' );
    const [ error, setError ] = useState( false );
    const isMounted = useRef( false );
    let formName = 'normal';

    useEffect( () => {
        isMounted.current = true;

        const fetchData = async () => {
            if ( isMounted.current ) {
                try {
                    let pokemon = await axios.get( `${ pokeForms.url }` );
                    let fetchedPokeForm = pokemon.data;
                    setAlternatives( fetchedPokeForm );
                }
                catch ( e ) {
                    setError( true );
                }
            }

        }
        fetchData();
        return () => {
            isMounted.current = false;
        };

    }, [ pokeForms ] )

    if ( error ) {
        return <h6>Something went wrong. Try again later.</h6>
    }

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