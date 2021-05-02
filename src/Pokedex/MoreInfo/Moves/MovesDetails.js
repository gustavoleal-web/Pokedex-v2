import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MoveDetails.module.css';


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
                    <p className={ styles.start }> { level }</p>
                    <p className={ styles.start }>{ name }</p>
                    <p className={ styles.start }>{ allMoveInfo.type.name }</p>
                    <p className={ styles.start }> { allMoveInfo.damage_class.name }</p>
                    { allMoveInfo.power === null ? <p className={ styles.end }>-</p> : <p className={ styles.end }>{ allMoveInfo.power }</p> }
                    { allMoveInfo.accuracy === null ? <p className={ styles.end }>-</p> : <p className={ styles.end }>{ allMoveInfo.accuracy }</p> }

                   
                </div>

            </> )

    }
    else return null;



}

export default MoveDetails;