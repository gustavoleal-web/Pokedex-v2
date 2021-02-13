import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Stats = ( { stats } ) => {
    // Natures:
    //Highest	1.1
    // High	1.05
    // Neutral	1
    // Low	0.95
    // Lowest	0.9

    //     Hit Points:
    //     ( (IV + 2 * BaseStat + (EV/4) ) * Level/100 ) + 10 + Level

    // Attack, Defense, Speed, Sp. Attack, Sp. Defense:
    //     (((IV + 2 * BaseStat + (EV/4) ) * Level/100 ) + 5) * Nature Value

    let ex = ( ( ( 0 + 2 * 55 + ( 0 / 4 ) ) * 100 / 100 ) + 5 ) * 0.9
    console.log( ex )
    //This creates a different linear gradiant for each stat 
    let gradientWStatsAsValue = {}
    let totalStats = 0;
    for ( let i = 0; i < stats.length; i++ ) {
        //The stop position will be based on the stat value.
        gradientWStatsAsValue[ stats[ i ].stat.name ] = `linear-gradient(to right, black ${ stats[ i ].base_stat }%, #eee 0%)`

        totalStats += stats[ i ].base_stat
    }

    return (
        <>
            {
                stats.map( ( stat, i ) =>

                    <span key={ uuidv4() }>
                        <div style={ { display: 'flex', justifyContent: 'space-evenly', marginTop: '30px' } }>
                            <p style={ { width: '200px' } }>{ stat.stat.name }: </p>
                            <p style={ { width: '200px' } }>{ stat.base_stat } </p>
                        </div>

                        <div style={ { height: '10px', background: `${ gradientWStatsAsValue[ stat.stat.name ] }` } }></div>


                    </span>

                )

            }
            <p style={ { marginTop: '20px', fontWeight: 'bold' } }>Total: { totalStats }</p>
        </>
    )
}

export default Stats