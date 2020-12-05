import React, { useState } from 'react';
import Pokedex from '../Pokedex/Pokedex'

//TODO: clear input after button is pressed

const Search = () => {
    let tempName = '';
    const [ name, setName ] = useState( '' );

    const updateName = ( e ) => {
        tempName = e.target.value;

    }

    const fetchSearchedPokemon = ( e ) => {
        setName( tempName );
    }
    
    return (
        <>
            <input type="text" placeholder='bulbasaur' onChange={ updateName } />
            <button onClick={ fetchSearchedPokemon }>Search</button>
            {name.length !== 0
                ? <Pokedex id={ name } />
                : null
            }
        </>
    )
}

export default Search;