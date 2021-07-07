import React, { useEffect, useRef, useState } from 'react';
import styles from './Training.module.css';
import axios from 'axios';

const Training = ( { data } ) => {
    const isMounted = useRef(false);
    const [ maxExperience, setMaxExperience ] = useState( {} );
    let url = data.grouthRate.url;
    let experience;

    useEffect( () => {
        isMounted.current = true;
        const fetchData = async () => {
            if ( isMounted ) {
                try {
                    let pokemon = await axios.get( url );
                    setMaxExperience( pokemon.data.levels[ 99 ] );
                }

                catch ( e ) {
                    console.log( e )
                }
            }

        }
        fetchData();
        return () => {
            isMounted.current = false;
          };
    }, [ url ] );

    if ( maxExperience.experience ) {
        //found RegEx online -> adds commas to the value. 
        //in this case 1000000 -> 1,000,000
        experience = maxExperience.experience.toString().replace( /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "," );
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
            <span>{ experience }</span>

        </div>
    )
}

export default React.memo( Training );