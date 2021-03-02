import React, { useEffect, useState } from 'react';
import { getAllWeakness, removeDuplicateType, oneFourthAndHalfDamage } from './filterTypeDamageFuncs';
import axios from 'axios';

const ResistanceWeakness = ( { type } ) => {
    const [ state, setState ] = useState( [] );
    let oneType;
    let twoTypes;

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

    if ( state.length === 1 ) {
        oneType = (
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
            zero: [],
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
        let dmgReceivedType1 = getAllWeakness( doubleDamageTypeOne, halfDamageTypeTwo );
        let dmgReceivedType2 = getAllWeakness( doubleDamageTypeTwo, halfDamageTypeOne );
        let allWeakNesses = [ ...dmgReceivedType1.weakness, ...dmgReceivedType2.weakness ];

        let fourTimesWeakness = {};

        for ( let i = 0; i < allWeakNesses.length; i++ ) {
            if ( fourTimesWeakness[ allWeakNesses[ i ] ] === undefined ) {
                fourTimesWeakness[ allWeakNesses[ i ] ] = 0
            }
            else {
                fourTimesWeakness[ allWeakNesses[ i ] ] += 1;
            }
        }

        //if a type weakeness is present one or more times then it does 4x damage
        for ( let key in fourTimesWeakness ) {
            if ( fourTimesWeakness[ key ] >= 1 && allWeakNesses.includes( key ) ) {
                damage.quadruple.push( key );
            }
        }

        let noDuplicateWeaknesses = [ ...new Set( allWeakNesses ) ];
        let quadrupleDamage = [ ...damage.quadruple ];
        removeDuplicateType( quadrupleDamage, noDuplicateWeaknesses );

        //a dual type pokemon may have a type that is resistant to the other
        //removing it from the array so it doesn't include the resistant type as a weakness
        //ex) barvoach is water/ground
        //water is weak against elect but ground is not affected
        //so elec must be removed as a weakness
        removeDuplicateType( noDamageFromTypeTwo, noDuplicateWeaknesses );
        removeDuplicateType( noDamageFromTypeOne, noDuplicateWeaknesses );

        let resistance = oneFourthAndHalfDamage( halfDamageTypeOne, halfDamageTypeTwo );

        if ( noDamageFromTypeOne.length !== 0 ) {
            removeDuplicateType( noDamageFromTypeOne, resistance.half );
            removeDuplicateType( noDamageFromTypeOne, resistance.fourth );
        }
        else if ( noDamageFromTypeTwo.length !== 0 ) {
            removeDuplicateType( noDamageFromTypeTwo, resistance.half );
            removeDuplicateType( noDamageFromTypeTwo, resistance.fourth );
        }

        removeDuplicateType( dmgReceivedType1.normal, resistance.half );
        removeDuplicateType( dmgReceivedType1.normal, resistance.fourth );
        removeDuplicateType( dmgReceivedType2.normal, resistance.half );
        removeDuplicateType( dmgReceivedType2.normal, resistance.fourth );

        damage.normal = [ ...dmgReceivedType1.normal, ...dmgReceivedType2.normal ]
        damage.oneHalf = [ ...resistance.half ];
        damage.oneFourth = [ ...resistance.fourth ];
        damage.double = [ ...noDuplicateWeaknesses ];
        twoTypes = (
            <div>
                <span>
                    { damage.oneHalf.length !== 0 ? damage.oneHalf.map( type => <p key={ type }>{ type }</p> ) : null }
                </span>

                <span>
                    { damage.oneFourth.length !== 0 ? damage.oneFourth.map( type => <p key={ type }>{ type }</p> ) : null }
                </span>

                <span>
                    { damage.double.length !== 0 ? damage.double.map( type => <p key={ type }>{ type }</p> ) : null }
                </span>
                <span>
                    { damage.quadruple.length !== 0 ? damage.quadruple.map( type => <p key={ type }>{ type }</p> ) : null }
                </span>

            </div>
        )
    }

    if ( state.length === 1 ) { return oneType }
    else if ( state.length === 2 ) { return twoTypes }
    else { return null }
}

export default ResistanceWeakness;