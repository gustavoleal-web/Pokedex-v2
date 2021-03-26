import React, { useState } from 'react';
import Pokedex from '../../Pokedex';
import VarietiesSprites from './VarietiesSprites/VarietySprites'
import styles from './varieties.module.css'

const Varieties = ( { varieties, clickedPoke } ) => {
    const [ form, setForms ] = useState( null );

    const retrieveById = ( url ) => {
        //extracted only the id from the url b/c using the Pokemon doesn't always work
        let id = url.slice( 34, url.length - 1 );
        setForms( <Pokedex id={ id } clickedPoke={ clickedPoke } /> )
    }

    return (
        <>
            {
                varieties.map( form => {
                    if ( form.is_default === false ) {
                        return (
                            <span key={ form.pokemon.name }>
                                <p
                                    onClick={ () => retrieveById( form.pokemon.url ) }
                                    className={ styles.cursor } >
                                    { form.pokemon.name }
                                </p>
                                <VarietiesSprites url={form.pokemon.url}/>
                            </span>

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