import React, { useState } from 'react';
import Pokedex from '../../Pokedex';
import Sprites from './Sprites/Sprites'
import styles from './varieties.module.css'

const Varieties = ( { varieties } ) => {
    const [ form, setForms ] = useState( null );
    const varietiesCopy = [ ...varieties ];

    if ( varieties.length === 1 ) {
        return <h6 className={ styles.noVarieties }>This pokemon does not have different varieties.</h6>;
    }


    for ( let key in varietiesCopy ) {
        if ( !varieties[ key ].is_default ) {
            let updateName = varieties[ key ].pokemon.name.split( '-' );
            let rearrangedName;

            if ( updateName.length === 4 ) {
                rearrangedName = `${ updateName[ 3 ] } ${ updateName[ 0 ] } ${ updateName[ 1 ] } ${ updateName[ 2 ] }`
            }

            else if ( updateName.length === 3 ) {
                rearrangedName = `${ updateName[ 1 ] } ${ updateName[ 0 ] } ${ updateName[ 2 ] }`
            }
            else if ( updateName.length === 2 ) {
                rearrangedName = `${ updateName[ 1 ] } ${ updateName[ 0 ] }`;
            }
            varietiesCopy[ key ].pokemon.rearrangedName = rearrangedName;
        }

    }

    const retrieveById = ( url ) => {
        //extracted only the id from the url b/c using the Pokemon name doesn't always work
        let id = url.slice( 34, url.length - 1 );
        setForms( <Pokedex id={ id } /> )
    }

    return (
        <div className={ styles.container }>
            {
                varietiesCopy.map( form => {
                    if ( form.is_default === false ) {
                        return (
                            <span key={ form.pokemon.name }>

                                <Sprites url={ form.pokemon.url } retrieveById={ retrieveById } />
                                <p className={ styles.name }>
                                    { form.pokemon.rearrangedName }
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