import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResistanceWeakness = ( { type } ) => {
    console.log( type )
    const [ state, setState ] = useState( [] );
    const [ damageRelations, setDamageRelations ] = useState( {} );

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
                    setState( pokemon.data )

                    let tempObj = { ...pokemon.data.damage_relations }
                    const renamedObj = renameKeys( tempObj, newKeys );
                    renamedObj.name = pokemon.data.name;
                    setDamageRelations( renamedObj );

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

                    let tempObj1 = { ...p1.data.damage_relations }
                    let tempObj2 = { ...p2.data.damage_relations }
                    const renamedObj1 = renameKeys( tempObj1, newKeys );
                    const renamedObj2 = renameKeys( tempObj2, newKeys );
                    renamedObj1.name = p1.data.name;
                    renamedObj2.name = p2.data.name;

                    let arr = [ renamedObj1, renamedObj2 ]
                    setDamageRelations( arr )

                }
                catch ( e ) {
                    console.log( e );
                }
            }
        }
        fetchData();

    }, [ type ] );

    if ( damageRelations.length !== 0 ) {
        console.log( damageRelations )
    }

    return (
        <>

            <div>

            </div>
        </>
    )
}

export default ResistanceWeakness;