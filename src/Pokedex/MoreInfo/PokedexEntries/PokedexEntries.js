import React from 'react'

const PokedexEntries = ( { pokedexData } ) => {
    let englishEntry = '';
    for ( let i = pokedexData.pokedexTextEntries.length - 1; i >= 0; i-- ) {
        if ( pokedexData.pokedexTextEntries[ i ].language.name === 'en' ) {
            englishEntry = pokedexData.pokedexTextEntries[ i ].flavor_text;
            break;
        }
    }
    return (
        <div>
            <p>{englishEntry}</p>
        </div>
    )
}

export default React.memo(PokedexEntries);