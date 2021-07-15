import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from './MoveDetails.module.css';

const MoveDetails = ( { name, level, learnMethod } ) => {
    const isMounted = useRef( false );
    const [ allMoveInfo, setAllMoveInfo ] = useState( {} );
    const [ tm, setTm ] = useState( {} );
    const [ error, setError ] = useState( false );
    //these tables are shorter so the appropriate container class will accommodate for it
    let tableSize = ( learnMethod === 'tutor' || learnMethod === 'egg' ) ? styles.container2 : styles.container;

    useEffect( () => {
        isMounted.current = true;
        const fetchData = async () => {
            if ( isMounted.current ) {
                try {
                    let pokemon = await axios.get(
                        `https://pokeapi.co/api/v2/move/${ name }/` );

                    setAllMoveInfo( pokemon.data );

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

    }, [ name ] );


    useEffect( () => {
        isMounted.current = true;
        const fetchData = async () => {
            if ( isMounted.current && Object.keys( allMoveInfo ).length !== 0 && learnMethod === 'machine' ) {

                try {
                    let url = allMoveInfo.machines[ allMoveInfo.machines.length - 1 ].machine.url;
                    let pokemon = await axios.get( url );

                    if ( pokemon.status === 200 ) {
                        setTm( pokemon.data );
                    }

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

    }, [ allMoveInfo, learnMethod ] );

    if ( error ) {
        return <h6><span style={ { fontWeight: 'bold' } }>{ name }</span> data could not be loaded.</h6>
    }


    let levelOrTm;

    if ( Object.keys( allMoveInfo ).length !== 0 && Object.keys( tm ).length !== 0 ) {
        let tmNumber = tm.item.name.slice( 2 )
        levelOrTm = <p className={ styles.start }>{ tmNumber }</p>
    }
    //so the value 0 is not displayed in the pokemon level column it will be assinged null
    else if ( level === 0 ) {
        levelOrTm = null
    }
    else {
        levelOrTm = <p className={ styles.start }> { level }</p>
    }

    if ( Object.keys( allMoveInfo ).length !== 0 ) {
        let type = `${ allMoveInfo.type.name }.png`;
        let seals = `move-${ allMoveInfo.damage_class.name }.png`;
        let movePower = allMoveInfo.power === null ? <p className={ styles.end }>-</p> : <p className={ styles.end }>{ allMoveInfo.power }</p>
        let accuracy = allMoveInfo.accuracy === null ? <p className={ styles.end }>-</p> : <p className={ styles.end }>{ allMoveInfo.accuracy }</p>

        return (
            <>
                <hr />
                <div className={ tableSize }>
                    { levelOrTm }
                    <p className={ styles.start }>{ name }</p>
                    <img
                        src={ ` https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/go/${ type }` }
                        alt={ allMoveInfo.type.name }
                        className={ styles.moveIcons }
                    />

                    <img
                        src={ `https://raw.githubusercontent.com/msikma/pokesprite/master/misc/seals/home/${ seals }` }
                        alt={ allMoveInfo.damage_class.name }
                        className={ styles.moveIcons }
                    />

                    { movePower }
                    { accuracy }
                </div>

            </> )

    }
    else return null;



}

export default MoveDetails;