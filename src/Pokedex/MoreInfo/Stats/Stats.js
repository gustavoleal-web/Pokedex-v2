import React from 'react';
import MinAndMaxStats from './MinAndMaxStats/MinAndMaxStats'
import styles from './stats.module.css';
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
                stats.map( ( stat ) =>

                    <span key={ uuidv4() }>
                        <div className={ styles.statsValues }>
                            <p >{ stat.stat.name }: </p>
                            <p >{ stat.base_stat } </p>
                        </div>

                        <div style={ { height: '10px', background: `${ gradientWStatsAsValue[ stat.stat.name ] }` } }></div>

                    </span>

                )
            }
            <p className={ styles.totalStats }>Total: { totalStats }</p>


            <span className={ styles.minMaxTitles }>
                <p></p>
                <p>Min</p>
                <p>Max</p>
            </span>
            {
                stats.map( stat => <MinAndMaxStats stat={ stat.base_stat } name={ stat.stat.name } key={stat.stat.name}/> )
            }

            <p className={ styles.minMaxStatement }>
                The range are for LV 100 Pokemon.
                Min stats are based on hindering nature with 0 IVs and 0 EVs.
                Max stats are based on beneficial nature with 31 IVs and 252 EVs.
            </p>



        </>
    )
}

export default React.memo( Stats );