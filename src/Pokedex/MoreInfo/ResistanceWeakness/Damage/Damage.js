import React from 'react';
import styles from '../ResistanceWeakness.module.css';
import backgroundTypeColor from '../../../pokeTypes.module.css';
import { v4 as uuidv4 } from 'uuid';


const Damage = ( { damageList, timesDamage } ) => {
    //if resist is an object it will execute this block
    //it is needed b/c the prop type.name will need to be accessed unlike the arr in the else check
    if ( damageList[ 0 ].hasOwnProperty( 'name' )) {
        return (
            <>
                <h6>{ timesDamage }</h6>
                <span className={ styles.container } key={uuidv4()}>
                    {
                        damageList.map( type =>
                            <p
                                className={ backgroundTypeColor[ type.name ] }
                                key={ type.name } >
                                { type.name }
                            </p> )
                    }
                </span>

            </>


        )

    }
    else {
        return (
            <>
                <h6>{ timesDamage }</h6>
                <span className={ styles.container }  key={uuidv4()}>
                    { damageList.map( type => <p className={ backgroundTypeColor[ type ] } key={ type } >{ type }</p> ) }

                </span>
            </>
        )
    }

}

export default Damage;