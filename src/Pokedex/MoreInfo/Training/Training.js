import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Training = ( { data } ) => {
    const [ maxExperience, setMaxExperience ] = useState( {} );
    let url = data.grouthRate.url;
    let experience;

    useEffect( () => {
        const fetchData = async () => {
            try {
                let pokemon = await axios.get( url );
                setMaxExperience( pokemon.data.levels[ 99 ] );
            }

            catch ( e ) {
                console.log( e )
            }
        }
        fetchData()
    }, [ url ] );

    if ( maxExperience.experience ) {
        //found RegEx online -> adds commas to the value. 
        //in this case 1000000 -> 1,000,000
        experience = maxExperience.experience.toString().replace( /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "," );
    }

    return (
        <div>
            <h4>Training Data</h4>
            <p>Base Happiness: { data.baseHappiness }</p>
            <p>Capture Rate: { data.captureRate }</p>
            <p>Growth Rate: { data.grouthRate.name }</p>
            <p>Experience to reach Lv { maxExperience.level }: { experience }</p>
        </div>
    )
}

export default React.memo( Training );