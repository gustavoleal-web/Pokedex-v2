import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from './Sprites.module.css';

const Sprites = ( { url, retrieveById } ) => {
    const isMounted = useRef(false);
    const [ sprite, setSprites ] = useState( null );

    useEffect( () => {
         isMounted.current = true;
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
        }
        fetchData();
        return () => {
            isMounted.current = false;
        };


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