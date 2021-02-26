import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const ResistanceWeakness = ( { type } ) => {
    const [ state, setState ] = useState( [] );

    const damage = {
        double: [],
        quadruple: [],
        half: 0.5,
        zero: 0
    }

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


    //if a halfDamage type in index 0 is present in doubleDamage in index 1 that type cancels out and the pokemon is not affected
    //vise versa for doubleDamege in 0 and halfDamage in 1

    const getAllWeakness = ( doubleDamage, halfDamage ) => {
        let double = [];
        let half = [];

        for ( let i = 0; i < doubleDamage.length; i++ ) {
            double.push( doubleDamage[ i ].name );
        }
        for ( let i = 0; i < halfDamage.length; i++ ) {
            half.push( halfDamage[ i ].name )
        }

        let noDoublesWeakness = double.map( type => {
            if ( half.includes( type ) ) {
                return null
            }
            else {
                return type
            }
        } );

        return noDoublesWeakness;
    }


    const removeResistanceFromWeakness = ( noDamage, noDuplicateWeaknesses ) => {
        noDamage.map( type => {
            if ( noDuplicateWeaknesses.includes( type.name ) ) {
                noDuplicateWeaknesses.splice( noDuplicateWeaknesses.indexOf( type.name ), 1 )

            }
            return true;
        } );
        return true;
    }



    if ( state.length === 1 ) {
        return (
            <span>
                <h4>Weakness</h4>
                <div>
                    {
                        state[ 0 ].damage_relations.double_damage_from.map( weakness =>
                            <p key={ weakness.name }>{ weakness.name }</p> )
                    }
                </div>


                <h4>Resistance</h4>
                <div>
                    {
                        state[ 0 ].damage_relations.half_damage_from.map( resistance =>
                            <p key={ resistance.name }>{ resistance.name }</p> )
                    }
                </div>

            </span>

        )

    }
    else if ( state.length === 2 ) {
        let doubleDamageTypeOne = state[ 0 ].damage_relations.double_damage_from;
        let halfDamageTypeTwo = state[ 1 ].damage_relations.half_damage_from;

        let doubleDamageTypeTwo = state[ 1 ].damage_relations.double_damage_from;
        let halfDamageTypeOne = state[ 0 ].damage_relations.half_damage_from;

        let noDamageFromTypeOne = state[ 0 ].damage_relations.no_damage_from;
        let noDamageFromTypeTwo = state[ 1 ].damage_relations.no_damage_from;

        //some pokemon have weaknesses that contradict with their other type
        //type1 might be weak to type2 but that pokemon is not b/c it has both types
        //so the type weakness must be removed to prevent confusion
        //ex: bulbasaur is grass/poison
        //grass is weak against poison but bulbasaur is both so it is not considered a weakness
        let type1Weakness = getAllWeakness( doubleDamageTypeOne, halfDamageTypeTwo );
        let type2Weakness = getAllWeakness( doubleDamageTypeTwo, halfDamageTypeOne );

        let allWeakNesses = [ ...type1Weakness, ...type2Weakness ];
        let noDuplicateWeaknesses = [ ...new Set( allWeakNesses ) ];

        //a dual type pokemon may have a type that is resistant to the other
        //removing it from the array so it doesn't include the resistant type as a weakness
        //ex) barvoach is water/ground
        //water is weak against elect but ground is not affected
        //so elec must be removed as a weakness
        removeResistanceFromWeakness( noDamageFromTypeTwo, noDuplicateWeaknesses );
        removeResistanceFromWeakness( noDamageFromTypeOne, noDuplicateWeaknesses );

        const quadrupleDamage = type1Weakness.filter( value => type2Weakness.includes( value ) );
        damage.quadruple = quadrupleDamage;

        //removes quadruple type from the weaknesses array and the remaining are the types that cause double damage
        const doubleDamage = noDuplicateWeaknesses.filter( value => !quadrupleDamage.includes( value ) );
        damage.double = doubleDamage;

        let resis1 = state[ 0 ].damage_relations.half_damage_from.map( value => value.name );
        let resis2 = state[ 1 ].damage_relations.half_damage_from.map( value => value.name );

        // console.log(resis2, resis1)

        let oneFourth = resis1.filter( value => resis2.includes( value ) );
        let test = resis1.filter( value => !resis2.includes( value ) )

        resis1.map( value => {
            if ( resis2.indexOf( value ) !== -1 ) {
                resis2.splice( resis2.indexOf( value ), 1 )
            }
        } );

        let half = [...test, ...resis2];
        console.log(half)



        return (
            <>
                <h4>Weakness</h4>
                { noDuplicateWeaknesses.map( weakness => <p key={ uuidv4() }>{ weakness }</p> ) }
            </>

        )

    }
    else {
        return (
            <>
            </>
        )
    }

}

export default ResistanceWeakness;