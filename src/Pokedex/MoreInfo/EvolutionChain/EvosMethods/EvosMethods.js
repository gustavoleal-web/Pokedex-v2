import React from 'react';
import IndividualMethods from './IndividualEvosMethods/IndividualMethods'

const EvosMethods = ( { methods } ) => {

    let doesNotEvo = null;
    let allWaysToEvolve = [];
    let basePokemon = methods.length !== 0 ? <p>{ methods[ 0 ].name }</p> : null;

    methods.map( ( m ) => {
        let removedFalseValues = {};
        let name = m.name;
        let nextEvo = m.evolutionDetails.nextEvo;

        Object.entries( m.evolutionDetails.howToEvolve ).map( entry => {
            //removes all the object prorties with null, false or empty values  
            if ( entry[ 1 ] !== null && entry[ 1 ] !== '' && entry[ 1 ] !== false ) {

                if ( entry[ 1 ].name ) {
                    removedFalseValues.name = name;
                    removedFalseValues.evolvesTo = nextEvo;
                    removedFalseValues[ entry[ 0 ] ] = entry[ 1 ].name;
                }

                else {
                    removedFalseValues[ entry[ 0 ] ] = entry[ 1 ];
                }
            }
            return true;
        } );

        allWaysToEvolve.push( removedFalseValues );
        return true;
    } );



    return (
        <div>
            {basePokemon }

            {doesNotEvo ? doesNotEvo : allWaysToEvolve.map( ( object, i ) => <IndividualMethods obj={ object } key={ i } /> ) }
        </div>
    )
}

export default React.memo( EvosMethods );