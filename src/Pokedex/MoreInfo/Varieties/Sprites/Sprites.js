import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Sprites.module.css';

const Sprites = ( { url, retrieveById } ) => {
    const [ sprite, setSprites ] = useState( null );

    useEffect( () => {
        let isMounted = true;
        const fetchData = async () => {
            if ( isMounted ) {
                try {
                    let pokemon = await axios.get( url );

                    if ( pokemon.status === 200 ) {
                        setSprites( pokemon.data.sprites.front_default )
                    }
                }
                catch ( e ) {
                    console.log( e )
                }
            }
            return () => {
                isMounted = false;
            };

        }
        fetchData();

    }, [ url ] );

    if ( sprite !== null ) {
        return <img
            src={ sprite }
            alt={ sprite }
            onClick={ () => retrieveById( url ) }
            className={ styles.sprite }
        />
    }
    else return null;
}

export default Sprites;