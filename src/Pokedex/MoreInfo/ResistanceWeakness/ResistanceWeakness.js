import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResistanceWeakness = ( { type } ) => {
    const [ state, setState ] = useState( null );
    const [ doubleDamage, setDoubleDamage ] = useState( [] );
    const [ halfDamage, setHalfDamage ] = useState( [] );
    const [ noDamage, setNoDamage ] = useState( [] );

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
            try {
                let pokemon = await axios.get( `${ type.type.url }` )
                setState( pokemon.data )

                let tempObj = { ...pokemon.data.damage_relations }
                const renamedObj = renameKeys( tempObj, newKeys );
                renamedObj.name = pokemon.data.name;

                let renameDoubleDamage = {};
                renameDoubleDamage.name = pokemon.data.name;
                ( {
                    double_damage_from: renameDoubleDamage.doubleDamageFrom,
                    double_damage_to: renameDoubleDamage.doubleDamageTo,
                } = pokemon.data.damage_relations );
                setDoubleDamage( renameDoubleDamage );
            }
            catch ( e ) {
                console.log( e );
            }
        }
        fetchData();

    }, [ type.type.url ] );






    return (
        <div></div>
    )
}

export default ResistanceWeakness