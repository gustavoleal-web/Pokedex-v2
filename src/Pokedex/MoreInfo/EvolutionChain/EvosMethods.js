import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const EvosMethods = ( { methods } ) => {
    let tempState = [];

    // for ( let i = 0; i < methods.length; i++ ) {
    //     for ( let key in methods[ i ].evolutionDetails.howToEvolve ) {
    //         if ( methods[ i ].evolutionDetails.howToEvolve[ key ] !== null
    //             && methods[ i ].evolutionDetails.howToEvolve[ key ] !== ""
    //             && methods[ i ].evolutionDetails.howToEvolve[ key ] !== false )

    //             if ( methods[ i ].evolutionDetails.howToEvolve[ key ].name ) {
    //                 console.log( key, methods[ i ].evolutionDetails.howToEvolve[ key ].name )
    //             }
    //             else {
    //                 console.log( key, methods[ i ].evolutionDetails.howToEvolve[ key ] )
    //             }
    //     }
    // }
    //console.log( methods )
    methods.map( ( m ) => {

        let tempObj = {};
        let name = m.name;
        let nextEvo = m.evolutionDetails.nextEvo;

        Object.entries( m.evolutionDetails.howToEvolve ).map( entry => {
            //console.log(entry)
            if ( entry[ 1 ] !== null && entry[ 1 ] !== '' && entry[ 1 ] !== false ) {
                if ( entry[ 1 ].name ) {
                    tempObj.name = name;
                    tempObj.evolvesTo = nextEvo;
                    let evolutionMethod = entry[ 1 ].name;

                    tempObj.trigger
                        ? tempObj.evolutionMethod = evolutionMethod
                        : tempObj.trigger = evolutionMethod
                }
                else {
                    tempObj.how === undefined
                        ? tempObj.how = entry[ 0 ]
                        : tempObj.min = entry[ 0 ]

                    tempObj.triggerRequirement === undefined
                        ? tempObj.triggerRequirement = entry[ 1 ]
                        : tempObj.here = entry[ 1 ];
                }
            }
            return true;
        } );

        tempState.push( tempObj );
        return true;
    } );

    return (
        <div style={ { display: 'grid' } }>
            {tempState.length !== 0 ? <h5>{ tempState[ 0 ].name }</h5> : null }

            {tempState.length !== 0
                ? tempState.map( x => {
                    return (
                        <span key={uuidv4()}>
                            <h5 > { x.evolvesTo }</h5>
                            <p >{ x.trigger }</p>
                            {x.evolutionMethod ? <span>{ x.evolutionMethod }</span> : <span>{ x.triggerRequirement }</span> }
                            {x.how ? <span>{ x.how }</span> : null }

                        </span>
                    )
                } )
                : <p>Pokemon does not evolve.</p> }
        </div>
    )
}

export default React.memo( EvosMethods );