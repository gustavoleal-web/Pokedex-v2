import React, { useState } from 'react';
import styles from './search.module.css';



//TODO: clear input after button is pressed

const Search = ( { wasClicked } ) => {
    const [ name, setName ] = useState( '' )
    const [ isDisbled, setIsDisabled ] = useState( true );
    const [ color, setColor ] = useState( styles.disabled )

    const updateName = ( e ) => {
        e.target.value = e.target.value.trim();
        //the shortest pokemon name is 3 char and the longest is 11
        if ( e.target.value.length >= 3 && e.target.value.length < 12 ) {
            setName( e.target.value );
            setIsDisabled( false );
            setColor( styles.enabled )

        }
        else {
            setIsDisabled( true );
            setColor( styles.disabled )
        }

    }

    return (
        <>
            <div className={styles.container}>
                <input type="text" placeholder='bulbasaur' onChange={ updateName } />
                <button onClick={ () => wasClicked( name ) } disabled={ isDisbled } className={`${ color } ${styles.search}`}>Search</button>
            </div>

            <p>For Pokemons with a period in their name e.i Mr.Mime use a dash (-) instead.</p>

        </>
    )
}

export default React.memo( Search );

