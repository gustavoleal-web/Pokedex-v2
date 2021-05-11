import React from 'react'

const PokedexEntries = ( { pokedexData } ) => {

    let englishEntry = '';
    let generation = '';
    const englishGenus = pokedexData.genus.find( genus => genus.language.name === 'en' );

    switch ( pokedexData.generation.name ) {
        case 'generation-i':
            generation = 'Generation 1'
            break;
        case 'generation-ii':
            generation = 'Generation 2'
            break;

        case 'generation-iii':
            generation = 'Generation 3'
            break;

        case 'generation-iv':
            generation = 'Generation 4'
            break;

        case 'generation-v':
            generation = 'Generation 5'
            break;

        case 'generation-vi':
            generation = 'Generation 6'
            break;

        case 'generation-vii':
            generation = 'Generation 7'
            break;

        case 'generation-viii':
            generation = 'Generation 8'
            break;

        default:
            generation = pokedexData.generation.name;
    }

    for ( let i = pokedexData.pokedexTextEntries.length - 1; i >= 0; i-- ) {
        //just the lastest english entry (the last one) is needed
        if ( pokedexData.pokedexTextEntries[ i ].language.name === 'en' ) {
            englishEntry = pokedexData.pokedexTextEntries[ i ].flavor_text;
            break;
        }
    }
    return (
        <>
            <p>This Pokemon was introduced in { generation }.</p>
            <p>It is known as the { englishGenus.genus }</p>
            <p style={ { maxWidth: '500px', margin: 'auto' } }>{ englishEntry }</p>
        </>
    )
}

export default React.memo( PokedexEntries );