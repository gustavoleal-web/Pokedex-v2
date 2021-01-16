import React, { useState } from 'react';
import Pokedex from '../../Pokedex';

const Varieties = ( { varieties } ) => {
    const [ form, setForms ] = useState( null );
    const test = ( url ) => {
        //extracted only the id from the url b/c using the Pokemon doesn't always work
        let id = url.slice( 34, url.length - 1 );
        //will have to add the prop clickedPoke b/c the other Pokedex has is
        setForms( <Pokedex id={ id } /> )
    }

    return (
        <div>
            {
                varieties.map( form => {
                    if ( form.is_default === false ) {
                        return (
                            <p key={ form.pokemon.name }
                                onClick={ () => test( form.pokemon.url ) }>
                                { form.pokemon.name }
                            </p>
                        )
                    }
                    return true;
                } )
            }
            {form }
        </div>
    )
}

export default React.memo( Varieties );