import React, { useState } from 'react';
import Pokedex from '../../Pokedex';

const Varieties = ( { varieties, clickedPoke } ) => {
    const [ form, setForms ] = useState( null );

    const retrieveById = ( url ) => {
        //extracted only the id from the url b/c using the Pokemon doesn't always work
        let id = url.slice( 34, url.length - 1 );
        setForms( <Pokedex id={ id } clickedPoke={clickedPoke}/> )
    }

    return (
        <>
            {
                varieties.map( form => {
                    if ( form.is_default === false ) {
                        return (
                            <p key={ form.pokemon.name }
                                onClick={ () => retrieveById( form.pokemon.url ) }>
                                { form.pokemon.name }
                            </p>
                        )
                    }
                    return true;
                } )
            }
            {form }
        </>
    )
}

export default React.memo( Varieties );