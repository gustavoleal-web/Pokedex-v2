import React from 'react';
import styles from '../ResistanceWeakness.module.css'
import backgroundTypeColor from '../../../pokeTypes.module.css'

const Resistance = ( { resist, timesDamage } ) => {

    if ( resist[ 0 ].hasOwnProperty( 'name' ) ) {
        return (
            <>
                <h6>{ timesDamage }</h6>
                <span className={ styles.container }>
                    { resist.map( type => <p className={ backgroundTypeColor[ type.name ] } key={ type.name }>{ type.name }</p> ) }

                </span>
            </>


        )

    }
    else {
        return (
            <>
            <h6>{timesDamage}</h6>
                <span className={ styles.container }>

                    { resist.map( type => <p className={ backgroundTypeColor[ type ] } key={ type }>{ type }</p> ) }

                </span>
            </>
        )
    }

}

export default Resistance;