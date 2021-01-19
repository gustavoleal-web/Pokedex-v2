import React from 'react';

const ShinyPoke = ( { shinySprite } ) => {
    let shiny;

    if ( shinySprite ) {
        shiny = <img src={ `${ shinySprite }` } alt='shiny version' />
    }
    else {
        shiny = null
    }
    return (
        <div>
            <p style={{textAlign: 'center'}}>shiny</p>
            { shiny }
        </div>
    )
}

export default ShinyPoke;