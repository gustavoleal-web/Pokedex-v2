import React, { useState } from 'react';
import styles from './search.module.css';
import { Button, Input } from 'reactstrap';
import icon from '../img/icons/loupe.png'


//TODO: clear input after button is pressed

const Search = ( { wasClicked } ) => {
    const [ name, setName ] = useState( '' )
    const [ isDisbled, setIsDisabled ] = useState( true );

    const updateName = ( e ) => {
        e.target.value = e.target.value.trim();
        //the shortest pokemon name is 3 char and the longest is 11
        if ( e.target.value.length >= 3 && e.target.value.length < 12 ) {
            setName( e.target.value );
            setIsDisabled( false );
        }
        else {
            setIsDisabled( true );
        }

    }

    return (
        <>
            <div className={ styles.container }>
                <Input placeholder="Pokemon" onChange={ updateName } />
                <Button
                    onClick={ () => wasClicked( name ) }
                    disabled={ isDisbled }
                    color='secondary'
                    className={ styles.button }>
                    <img src={ icon } alt='search icon' className={ styles.searchIcon } />
                </Button>
            </div>

            <p>For Pokemons with a period in their name e.i Mr.Mime use a dash (-) instead.</p>

        </>
    )
}

export default React.memo( Search );

