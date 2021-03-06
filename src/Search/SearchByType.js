import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const SearchByType = ( { setPokedexByTypeHandler } ) => {

    const types = [ 'fire', 'water', 'grass',
        'normal', 'electric', 'ice',
        'fighting', 'poison', 'ground',
        'flying', 'psychic', 'bug',
        'rock', 'ghost', 'dark',
        'dragon', 'steel', 'fairy' ]

    return <DropdownButton id="dropdown-basic-button" title="Types" variant="light">
        {
            types.map( type =>
               
                    <Dropdown.Item
                        onClick={ () => setPokedexByTypeHandler( type ) }
                        key={ type }>
                        { type }
                    </Dropdown.Item>
                   

            )
        }
    </DropdownButton>
}

export default SearchByType;