import React from 'react'

const SearchByType = ( { setPokedexByTypeHandler } ) => {
    const types = [ 'fire', 'water', 'grass' ]
    return <div>
        {
            types.map( type => <button onClick={ () => setPokedexByTypeHandler( type ) } key={type}>{ type }</button> )
        }
    </div>
}

export default SearchByType;