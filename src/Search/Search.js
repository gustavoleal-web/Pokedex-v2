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
            setColor(styles.disabled)
        }


    }

    return (
        <>
            <input type="text" placeholder='bulbasaur' onChange={ updateName } />
            <p>For Pokemons with a period in their name e.i Mr.Mime use a dash (-) instead.</p>
            <button onClick={ () => wasClicked( name ) } disabled={ isDisbled } className={ color }>Search</button>

        </>
    )
}

export default Search;

