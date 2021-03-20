import React from 'react';
import styles from './sprites.module.css'

const Sprites = ( { pokeImg, name, showModalHandler } ) => {
    //not all pokemon, especially the varieties have official artwork
    //so sprites will be shown in place
    //other wise it will display 'Image N/A'

    if ( pokeImg.other[ 'official-artwork' ].front_default !== null ) {
        return <img
            className={ `${ styles.imgWidth } ${ styles.pointer }` }
            src={ `${ pokeImg.other[ "official-artwork" ].front_default }` }
            alt={ name }
            onClick={ () => showModalHandler( true ) }
        />
    }

    else if ( pokeImg.front_default !== null ) {
        return <img
            src={ `${ pokeImg.front_default }` }
            alt={ name }
            onClick={ () => showModalHandler( true ) }
        />
    }

    else return <p onClick={ () => showModalHandler( true ) }>Image: N/A</p>
}

export default Sprites;