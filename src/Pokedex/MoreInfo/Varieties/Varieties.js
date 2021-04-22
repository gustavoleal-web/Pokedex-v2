import React, { useState } from 'react';
import Pokedex from '../../Pokedex';
import VarietiesSprites from './VarietiesSprites/VarietySprites'
import styles from './varieties.module.css'

const Varieties = ( { varieties } ) => {
    const [ form, setForms ] = useState( null );

    const retrieveById = ( url ) => {
        //extracted only the id from the url b/c using the Pokemon name doesn't always work
        let id = url.slice( 34, url.length - 1 );
        setForms( <Pokedex id={ id } /> )
    }

    return (
        <div className={styles.container}>
            {
                varieties.map( form => {
                    if ( form.is_default === false ) {
                        return (
                            <span key={ form.pokemon.name } style={ { width: '30%' } }>

                                <VarietiesSprites url={ form.pokemon.url } retrieveById={ retrieveById } />
                                <p className={ styles.cursor } >
                                    { form.pokemon.name }
                                </p>
                            </span>

                        )
                    }
                    return true;
                } )
            }
            { form }
        </div>
    )
}

export default React.memo( Varieties );