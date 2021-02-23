import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResistanceWeakness = ( { type } ) => {
    const [ state, setState ] = useState( [] );
    let renamedObj;
    let twoTypes = [];

    function renameKeys( tempObj, newKeys ) {
        const keyValues = Object.keys( tempObj ).map( key => {
            const newKey = newKeys[ key ] || key;
            return { [ newKey ]: tempObj[ key ] };
        } );
        return Object.assign( {}, ...keyValues );
    }

    const newKeys = {
        double_damage_from: 'doubleDamageFrom',
        double_damage_to: 'doubleDamageTo',
        half_damage_from: 'halfDamageFrom',
        half_damage_to: 'haldDamageTo',
        no_damage_from: 'noDamageFrom',
        no_damage_to: 'noDamageTo'
    };

    useEffect( () => {
        const fetchData = async () => {
            if ( type.length === 1 ) {
                try {
                    let pokemon = await axios.get( `${ type[ 0 ].type.url }` )
                    let arr = [ pokemon.data ]
                    setState( arr )
                }
                catch ( e ) {
                    console.log( e );
                }
            }
            else if ( type.length === 2 ) {
                try {
                    let promise1 = axios.get( `${ type[ 0 ].type.url }` );
                    let promise2 = axios.get( `${ type[ 1 ].type.url }` );

                    let p1 = await promise1;
                    let p2 = await promise2;
                    let arr = [ p1.data, p2.data ];
                    setState( arr )
                }
                catch ( e ) {
                    console.log( e );
                }
            }
        }
        fetchData();

    }, [ type ] );

    if ( state.length === 1 ) {
        let tempObj = { ...state[ 0 ].damage_relations }
        renamedObj = [ renameKeys( tempObj, newKeys ) ]
        renamedObj.name = state[ 0 ].name;
    }
    else if ( state.length === 2 ) {
        let tempObj1 = { ...state[ 0 ].damage_relations }
        let tempObj2 = { ...state[ 1 ].damage_relations }
        const renamedObj1 = renameKeys( tempObj1, newKeys );
        const renamedObj2 = renameKeys( tempObj2, newKeys );
        renamedObj1.name = state[ 0 ].name;
        renamedObj2.name = state[ 1 ].name;

        twoTypes = [ renamedObj1, renamedObj2 ];
        console.log( twoTypes )
    }

    //if a halfDamage type in index 0 is present in doubleDamage in index 1 that type cancels out and the pokemon is not affected
    //vise versa for doubleDamege in 0 and halfDamage in 1

    return (
        <>

            <div>

            </div>
        </>
    )
}

export default ResistanceWeakness;