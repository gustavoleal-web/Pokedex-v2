import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from './Sprites.module.css';
import pokeballIcon from '../../../../img/icons/pokeball.png';

const Sprites = ( { url, retrieveById } ) => {
    const isMounted = useRef( false );
    const [ sprite, setSprites ] = useState( null );
    const [ error, setError ] = useState( false );

    useEffect( () => {
        isMounted.current = true;
        const fetchData = async () => {
            if ( isMounted.current ) {
                try {
                    let pokemon = await axios.get( url );

                    if ( pokemon.status === 200 ) {
                        setSprites( pokemon.data.sprites.front_default )
                    }
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


    }, [ url ] );

    if ( sprite !== null ) {
        return <img
            src={ sprite }
            alt={ sprite }
            onClick={ () => retrieveById( url ) }
            className={ styles.sprite }
        />
    }
    else if ( error ) {
        return <img
            src={ pokeballIcon }
            alt='pokemon'
            className={ `${ styles.sprite } ${ styles.pokeball }` }
        />
    }

    else return null;
}

export default Sprites;