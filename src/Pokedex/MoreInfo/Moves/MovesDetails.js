import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MoveDatils.module.css';


const MoveDetails = ( { name, level } ) => {
    const [ allMoveInfo, setAllMoveInfo ] = useState( {} )

    useEffect( () => {
        let isMounted = true;
        const fetchData = async () => {
            if ( isMounted ) {
                try {
                    let pokemon = await axios.get(
                        `https://pokeapi.co/api/v2/move/${ name }/` );

                    if ( pokemon.status === 200 ) {
                        console.log( pokemon.data );
                        setAllMoveInfo( pokemon.data )
                    }


                }
                catch ( e ) {
                    console.log( e )
                }
            }
            return () => {
                isMounted = false;
            };

        }
        fetchData();

    }, [ name ] );


    if ( Object.keys( allMoveInfo ).length !== 0 ) {
        return (
            <>
                <hr />
                <div className={ styles.container }>
                    <p className={styles.start}>{ name }</p>
                    <p> { level }</p>
                    <p>{ allMoveInfo.type.name }</p>
                    <p>{ allMoveInfo.power }</p>
                    <p>{ allMoveInfo.pp }</p>
                    <p> { allMoveInfo.accuracy }</p>
                    <p> { allMoveInfo.damage_class.name }</p>
                </div>

            </> )

    }
    else return null;



}

export default MoveDetails;