import React from 'react'
import { v4 as uuidv4 } from 'uuid';

const IndividualMethods = ( { obj, clickedPoke } ) => {
    function renameKeys( obj, newKeys ) {
        const keyValues = Object.keys( obj ).map( key => {
            const newKey = newKeys[ key ] || key;
            return { [ newKey ]: obj[ key ] };
        } );
        return Object.assign( {}, ...keyValues );
    }

    const newKeys = {
        evolvesTo: 'evolution',
        min_level: 'Lv',
        min_happiness: 'happiness',
        held_item: 'holding',
        party_species: 'have_in_party',
        trade_species: 'trade_with'
    };
    const renamedObj = renameKeys( obj, newKeys );


    return (
        <div style={ { border: '1px solid black' } }>
            {
                Object.keys( renamedObj ).map( key => {
                    let evolutionInfo;
                    
                  //  too many if statements refactor
                    if ( renamedObj[ key ] === true ) {
                        evolutionInfo = <p>{ key }</p>
                    }

                    else if ( key === 'gender' && renamedObj[ key ] === 1 ) {
                        evolutionInfo = <p>{ `${ key }: female` }</p>
                    }

                    else if ( key === 'gender' && renamedObj[ key ] === 2 ) {
                        evolutionInfo = <p>{ `${ key }: male` }</p>
                    }

                    else if ( key === 'name' ) {
                        //prevents the name from being repeated for every evolution
                        evolutionInfo = null;
                    }
                    else if ( key === 'evolution' || key === 'trigger' ) {
                        evolutionInfo = <p key={ uuidv4() }>{ renamedObj[ key ].replace( '-', ' ' ) }</p>
                    }
                    else {
                        evolutionInfo = <p key={ uuidv4() }>{ `${ key.replaceAll( '_', ' ' ) }: ${ renamedObj[ key ] }` }</p>
                    }


                    return evolutionInfo;
                } )
            }
        </div>
    )
}

export default IndividualMethods;