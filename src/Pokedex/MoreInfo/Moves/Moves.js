import React from 'react';
import MoveDetails from './MovesDetails';
import TableTitles from './TableTitle/TableTitle'
import styles from './Moves.module.css';
import { v4 as uuidv4 } from 'uuid';

const Moves = ( { moves } ) => {
    const games = [ 'ultra-sun-ultra-moon', 'sun-moon', 'x-y', 'omega-ruby-alpha-sapphire' ];


    //function found online
    const compare = ( a, b ) => {
        const currentLv = a.level;
        const nextLv = b.level;

        let comparison = 0;
        if ( currentLv > nextLv ) {
            comparison = 1;
        } else if ( currentLv < nextLv ) {
            comparison = -1;
        }
        return comparison;
    }


    const movesByLearnedMethod = ( learnMethod ) => {
        const testArr = [];
        moves.forEach( move => {
            let version = move.version_group_details;

            //avoids pushing anything that doesn't match the method 
            if ( version.length === 1 && version[ version.length - 1 ].move_learn_method.name !== learnMethod ) {
                return;
            }

            //a pokemon can learn the same move from leveling up and from a tm
            //the else if checks the last 2 elemest of the obj and only 
            //returns the one matching the method 
            else if ( version[ version.length - 1 ].move_learn_method.name === learnMethod ) {
                testArr.push( { name: move.move.name, details: version[ version.length - 1 ] } )
            }
            else if ( version[ version.length - 2 ].move_learn_method.name === learnMethod ) {
                testArr.push( { name: move.move.name, details: version[ version.length - 2 ] } )
            }
        } );

        return testArr;
    }

    const movesByGameVersion = ( arr, pokemonGame ) => {
        const movesByGame = []

        arr.map( move => {
            let version = move.details.version_group;
            if ( version.name === pokemonGame ) {
                movesByGame.push(
                    {
                        name: move.name,
                        level: move.details.level_learned_at,
                        moveLearnMethod: move.details.move_learn_method.name,
                        gameVersion: move.details.version_group.name,
                    }
                )

            }
            return true;
        } );
        return movesByGame;
    }

    //func will search through games until it finds a non empty list of moves
    const latestAvailableMoves = ( arr, movesArr ) => {
        let j = 1;
        while ( arr.length === 0 ) {
            arr = movesByGameVersion( movesArr, games[ j ] );

            j++;
            if ( j > games.length ) {
                break;
            }
        }
        return arr;
    }


    const levelUpMoves = movesByLearnedMethod( 'level-up' );
    let levelUpMovesByGame = movesByGameVersion( levelUpMoves, games[ 0 ] );

    if ( levelUpMovesByGame.length === 0 ) {
        levelUpMovesByGame = latestAvailableMoves( levelUpMovesByGame, levelUpMoves );
    }

    const tutorMoves = movesByLearnedMethod( 'tutor' );
    let tutorMovesByGame = movesByGameVersion( tutorMoves, games[ 0 ] );

    if ( tutorMovesByGame.length === 0 ) {
        tutorMovesByGame = latestAvailableMoves( tutorMovesByGame, tutorMoves );
    }

    const tmMoves = movesByLearnedMethod( 'machine' );
    let tmMovesByGame = movesByGameVersion( tmMoves, games[ 0 ] );

    if ( tmMovesByGame.length === 0 ) {
        tmMovesByGame = latestAvailableMoves( tmMovesByGame, tmMoves );
    }

    const eggMoves = movesByLearnedMethod( 'egg' );
    let eggMovesByGame = movesByGameVersion( eggMoves, games[ 0 ] );

    if ( eggMovesByGame.length === 0 ) {
        eggMovesByGame = latestAvailableMoves( eggMovesByGame, eggMoves );
    }

    levelUpMovesByGame.sort( compare );

    return (

        <div className={ styles.componentSize }>

            <span>
                <h4 className={ styles.titleMargin }>Level Up Moves</h4>

                <TableTitles firstTitle='Lv.' />
                {
                    levelUpMovesByGame.map( move =>
                        <MoveDetails
                            name={ move.name }
                            level={ move.level }
                            learnMethod={ move.moveLearnMethod }
                            key={ uuidv4() }
                        /> )
                }
            </span>


            <span>
                <h4 className={ styles.titleMargin }>Tutor Moves</h4>
                <TableTitles firstTitle='tutor' />
                {
                    tutorMovesByGame.map( move =>
                        <MoveDetails
                            name={ move.name }
                            level={ move.level }
                            learnMethod={ move.moveLearnMethod }
                            key={ uuidv4() }
                        /> )
                }
            </span>

            <span>
                <h4 className={ styles.titleMargin }>TM Moves</h4>
                <TableTitles firstTitle='TM' />
                {
                    tmMovesByGame.map( move =>
                        <MoveDetails
                            name={ move.name }
                            level={ move.level }
                            learnMethod={ move.moveLearnMethod }
                            key={ uuidv4() }
                        /> )
                }
            </span>

            <span>
                <h4 className={ styles.titleMargin }>Egg Moves</h4>
                <TableTitles firstTitle='egg' />
                {
                    eggMoves.length === 0
                        ? <h6>Check base pokemon for eggs moves</h6>
                        : eggMovesByGame.map( move =>
                            <MoveDetails
                                name={ move.name }
                                level={ move.level }
                                learnMethod={ move.moveLearnMethod }
                                key={ uuidv4() }
                            />
                        )
                }
            </span>

        </div>


    )
}

export default Moves
