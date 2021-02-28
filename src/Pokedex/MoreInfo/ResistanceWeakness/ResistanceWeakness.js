import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const ResistanceWeakness = ( { type } ) => {
    const [ state, setState ] = useState( [] );

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
                    //the api can't fetched the url if it has a '/' at the end to it is removed
                    const editedUrl1 = type[ 0 ].type.url.slice( 0, -1 )
                    const editedUrl2 = type[ 1 ].type.url.slice( 0, -1 )

                    let promise1 = axios.get( editedUrl1 );
                    let promise2 = axios.get( editedUrl2 );

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
        let damage = {
            normal: [],
            weakness: []
        }
        let double = [];
        let half = [];

        for ( let i = 0; i < doubleDamage.length; i++ ) {
            double.push( doubleDamage[ i ].name );
        }
        for ( let i = 0; i < halfDamage.length; i++ ) {
            half.push( halfDamage[ i ].name )
        }

        let noDoublesWeakness = []
        double.forEach( type => {
            if ( half.includes( type ) ) {
                damage.normal.push( type )
            }
            else {
                noDoublesWeakness.push( type )
            }
        } );

        damage.weakness = [ ...noDoublesWeakness ];
        return damage;
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

    const oneFourthAndHalfDamage = ( typeOne, typeTwo ) => {
        let fractionalDamage = {
            fourth: [],
            half: []
        }

        let arr1 = [];
        let arr2 = [];
        for ( let value of typeOne ) {
            arr1.push( value.name )
        }
        for ( let value of typeTwo ) {
            arr2.push( value.name )
        }

        let oneFourthDamage = arr1.filter( type => arr2.includes( type ) );
        let oneHalfDamage1 = arr1.filter( type => !arr2.includes( type ) )
        let oneHalfDamage2 = arr2.filter( type => !arr1.includes( type ) );
        let oneHalfDamage = [ ...oneHalfDamage1, ...oneHalfDamage2 ];
        fractionalDamage.fourth = [ ...oneFourthDamage ];
        fractionalDamage.half = [ ...oneHalfDamage ];

        return fractionalDamage;

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
        let damage = {
            oneHalf: [],
            oneFourth: [],
            normal: [],
            double: [],
            quadruple: []
        }


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

        let allWeakNesses = [ ...type1Weakness.weakness, ...type2Weakness.weakness ];
        let test = {};


        for ( let i = 0; i < allWeakNesses.length; i++ ) {

            if ( test[ allWeakNesses[ i ] ] === undefined ) {
                test[ allWeakNesses[ i ] ] = 0
            }
            else {
                test[ allWeakNesses[ i ] ] += 1;
            }
        }
        console.log( test )

        let noDuplicateWeaknesses = [ ...new Set( allWeakNesses ) ];


        //a dual type pokemon may have a type that is resistant to the other
        //removing it from the array so it doesn't include the resistant type as a weakness
        //ex) barvoach is water/ground
        //water is weak against elect but ground is not affected
        //so elec must be removed as a weakness
        removeResistanceFromWeakness( noDamageFromTypeTwo, noDuplicateWeaknesses );
        removeResistanceFromWeakness( noDamageFromTypeOne, noDuplicateWeaknesses );

        let frac = oneFourthAndHalfDamage( state[ 0 ].damage_relations.half_damage_from, state[ 1 ].damage_relations.half_damage_from );

        damage.normal = [ ...type1Weakness.normal, ...type1Weakness.normal ]
        damage.oneHalf = [ ...frac.half ];
        damage.oneFourth = [ ...frac.fourth ];

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