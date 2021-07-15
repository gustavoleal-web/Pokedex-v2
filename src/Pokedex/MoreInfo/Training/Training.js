import React, { useEffect, useRef, useState } from 'react';
import styles from './Training.module.css';
import axios from 'axios';

const Training = ( { data } ) => {
    const isMounted = useRef( false );
    const [ error, setError ] = useState( false );
    const [ maxExperience, setMaxExperience ] = useState( {
        experience: 0,
        level: 0
    } );

    let url = data.grouthRate.url;
    let experience;

    useEffect( () => {
        isMounted.current = true;
        const fetchData = async () => {
            if ( isMounted.current ) {
                try {
                    let pokemon = await axios.get( url );
                    setMaxExperience( {
                        experience: pokemon.data.levels[ 99 ].experience,
                        level: pokemon.data.levels[ 99 ].level
                    } );
                }

                catch ( e ) {
                    setError( true );
                }
            }

        }
        fetchData();
        return () => {
            isMounted.current = false;
        };
    }, [ url ] );

    if ( error ) {
        experience = <h6>Error. Could not fetch info.</h6>
    }

    else if ( maxExperience.experience !== 0 ) {
        //found RegEx online -> adds commas to the value. 
        //in this case 1000000 -> 1,000,000
        experience = <span>{ maxExperience.experience.toString().replace( /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "," ) }</span>
    }

    return (
        <div className={ styles.container }>
            <p>Base Happiness: </p>
            <span>{ data.baseHappiness }</span>
            <p>Capture Rate: </p>
            <span>{ data.captureRate }</span>
            <p>Growth Rate: </p>
            <span>{ data.grouthRate.name }</span>
            <p>Experience to reach Lv { maxExperience.level }: </p>
            { experience }

        </div>
    )
}

export default React.memo( Training );