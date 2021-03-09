import React from 'react';

const Sprites = ( { pokeImg, name } ) => {
    return (
        
        pokeImg.other[ "official-artwork" ].front_default !== null
            ? <img style={ { width: '30%' } } src={ `${ pokeImg.other[ "official-artwork" ].front_default }` } alt={ name } />
            : pokeImg.front_default !== null
                //not all pokemon, especially the varieties have official artwork
                //so sprites will be shown in place
                //other wise it will display 'Image N/A'
                ? <img src={ `${ pokeImg.front_default }` } alt={ name } />
                : <p>Image: N/A</p>
    )
}

export default Sprites;