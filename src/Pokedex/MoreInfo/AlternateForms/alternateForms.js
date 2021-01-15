import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AlternateForms = ( { pokeForms, shinySprite } ) => {
    const [ alternatives, setAlternatives ] = useState( '' );
    //TODO: the pokemon Unown displays the same shiny sprite for each form -> fix

    let shiny;
    if ( shinySprite ) {
        shiny = <img src={ `${ shinySprite }` } alt={ `${ alternatives.form_name }` } />
    }
    else {
        shiny = null
    }


    useEffect( () => {
        const fetchData = async () => {
            try {
                let pokemon = await axios.get( `${ pokeForms.url }` )
                let pokemonEntries = pokemon.data;
                setAlternatives( pokemonEntries );
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
                        { shiny }
                    </div>
                    : null
            }
        </>


    )
}

export default React.memo( AlternateForms );