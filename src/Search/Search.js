import React, { useState } from 'react';
import Pokedex from '../Pokedex/Pokedex'

//{name.length !== 0
// questionMark <Pokedex id={ name } />
// : null }


//TODO: clear input after button is pressed

const Search = ( { clicked, wasClicked } ) => {
    const [ name, setName ] = useState( '' );

    const updateName = ( e ) => {
        setName( e.target.value )
    }

    return (
        <>
            <input type="text" placeholder='bulbasaur' onChange={ updateName } />
            <button onClick={ () => wasClicked( name ) }>Search</button>

        </>
    )
}

export default Search;

