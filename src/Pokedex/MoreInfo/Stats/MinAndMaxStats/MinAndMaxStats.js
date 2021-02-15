import React from 'react';

const MinAndMaxStats = ( { stat, name } ) => {

    const statCalculator = ( IVs, EVs, baseStat, additional, natureValue = 1 ) => {
        // Possible Natures: Highest 1.1, High 1.05, Neutal 1, Low, 0.95, lowest, 0.9

        let level = 100;
        let total = 0;
        if ( name === 'hp' ) {
            //Formula  Hit Points:
            //( (IV + 2 * baseStat + (EV/4) ) * level/100 ) + 10 + level
            total = ( ( IVs + 2 * baseStat + ( EVs / 4 ) ) * level / 100 ) + additional + level;
        }
        else {
            // Attack, Defense, Speed, Sp. Attack, Sp. Defense:
            // (((IV + 2 * baseStat + (EV/4) ) * level/100 ) + 5) * Nature Value
            total = ( ( ( IVs + 2 * baseStat + ( EVs / 4 ) ) * level / 100 ) + 5 ) * natureValue;
        }
        return Math.floor( total );

    }



    let baseStat = stat;
    //simply to display the name abbreviated
    if ( name === 'special-attack' ) {
        name = 'sp atk'
    }
    if ( name === 'special-defense' ) {
        name = 'sp def'
    }
    let minHp = 0;
    let maxHp = 0;

    let minStat = 0;
    let maxStat = 0;

    let displayStat = null;

    if ( name === 'hp' ) {
        minHp = statCalculator( 0, 0, baseStat, 10 );
        maxHp = statCalculator( 31, 252, baseStat, 10 );
    }

    else {
        minStat = statCalculator( 0, 0, baseStat, 5, 0.9 );
        maxStat = statCalculator( 31, 252, baseStat, 5, 1.1 );
    }


    if ( minHp !== 0 && maxHp !== 0 ) {
        displayStat = (
            <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' } }>
                <p>{ name }</p>
                <p>{ minHp }</p>
                <p>{ maxHp }</p>
            </div>
        )
    }

    else if ( minStat !== 0 && maxStat !== 0 ) {
        displayStat = (
            <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' } }>
                <p>{ name }</p>
                <p>{ minStat }</p>
                <p>{ maxStat }</p>
            </div>
        )
    }

    return (
        <>
            {displayStat }
        </>
    )
}

export default MinAndMaxStats;