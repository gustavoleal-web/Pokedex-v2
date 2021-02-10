import React from 'react';

const Breeding = ( { eggData } ) => {
    let groups;
    let stepsToHatch = eggData.hatchCounter * 250;

    if ( eggData.eggGroups[ 0 ].name === 'no-eggs' ) {
        groups = <p>Egg Groups: Undiscovered</p>
    }

    else if ( eggData.eggGroups.length === 2 ) {
        groups = <p>Egg Group: { eggData.eggGroups[ 0 ].name } and { eggData.eggGroups[ 1 ].name }</p>
    }

    else {
        groups = <p>Egg Group: { eggData.eggGroups[ 0 ].name }</p>
    }


    return (
        <>
            {groups}
            <p>Hatch Counter: {eggData.hatchCounter}  (Approx: {stepsToHatch} steps)</p>
        </>
    )
}

export default Breeding