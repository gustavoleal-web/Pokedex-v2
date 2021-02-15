import React from 'react';
import MinAndMaxStats from './MinAndMaxStats/MinAndMaxStats'
import { v4 as uuidv4 } from 'uuid';

const Stats = ( { stats } ) => {


    //This creates a different linear gradiant bar for each stat 
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


            <span style={ { display: 'flex', justifyContent: 'space-evenly', marginTop: '35px' } }>
                <p>Min</p>
                <p>Max</p>
            </span>
            {
                stats.map( stat => <MinAndMaxStats stat={ stat.base_stat } name={ stat.stat.name } /> )
            }

            <p style={ { fontSize: '14px', padding: '0px 0px', margin: '0px 0px' } }>
                The range are for LV 100 Pokemon.
                Min stats are based on hindering nature with 0 IVs and 0 EVs.
                Max stats are based on beneficial nature with 31 IVs and 252 EVs.
            </p>



        </>
    )
}

export default React.memo( Stats );