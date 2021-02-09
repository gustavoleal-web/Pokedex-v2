import React from 'react';
import IndividualMethods from './IndividualEvosMethods/IndividualMethods'

const EvosMethods = ( { methods, clickedPoke } ) => {

    let doesNotEvo = null;
    let tempState2 = [];
    let basePokemon = methods.length !== 0 ? <p onClick={ () => clickedPoke( methods[ 0 ].name ) }>{ methods[ 0 ].name }</p> : null;

    methods.map( ( m ) => {
        let tempObj2 = {};
        let name = m.name;
        let nextEvo = m.evolutionDetails.nextEvo;

        

        Object.entries( m.evolutionDetails.howToEvolve ).map( entry => {
            //removes all the object prorties with null, false or empty values  
            if ( entry[ 1 ] !== null && entry[ 1 ] !== '' && entry[ 1 ] !== false ) {

                if ( entry[ 1 ].name ) {
                    tempObj2.name = name;
                    tempObj2.evolvesTo = nextEvo;
                    tempObj2[ entry[ 0 ] ] = entry[ 1 ].name;
                }

                else {
                    tempObj2[ entry[ 0 ] ] = entry[ 1 ];
                }
            }
            return true;
        } );

        tempState2.push( tempObj2 );
        return true;


    } );



    return (
        <div>
            {basePokemon }

            {doesNotEvo ? doesNotEvo : tempState2.map( ( object, i ) => <IndividualMethods obj={ object } key={ i } clickedPoke={ clickedPoke } /> ) }
        </div>
    )
}

export default React.memo( EvosMethods );