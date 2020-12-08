import React, { useState } from 'react';

//{name.length !== 0
// questionMark <Pokedex id={ name } />
// : null }


//TODO: clear input after button is pressed

const Search = ( { clicked, wasClicked } ) => {
    const [ name, setName ] = useState( '' )
    const [ isDisbled, setIsDisabled ] = useState( true );


    const updateName = ( e ) => {
        setName( e.target.value );
        if ( e.target.value.length >= 3 && e.target.value.length < 12 ) {
            setIsDisabled( false );
        }
        else {
            setIsDisabled( true );
        }
        
    }

    return (
        <>
            <input type="text" placeholder='bulbasaur' onChange={ updateName }  />
            <button onClick={ () => wasClicked( name ) } disabled={ isDisbled }>Search</button>

        </>
    )
}

export default Search;

