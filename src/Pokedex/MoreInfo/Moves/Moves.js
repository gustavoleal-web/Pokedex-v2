import React from 'react';

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


    const movesByLearnedMethod = ( method ) => {
        const levelUpMoves = moves.filter( move => {
            let version = move.version_group_details;

            if ( version.length === 1 && version[ version.length - 1 ].move_learn_method.name !== method ) {
                return false;
            }

            else if ( version[ version.length - 1 ].move_learn_method.name === method ) {
                return version[ version.length - 1 ];
            }
            else if ( version[ version.length - 2 ].move_learn_method.name === method ) {
                return version[ version.length - 2 ];
            }
            else return false;
        } );

        return levelUpMoves
    }

    const movesByGameVersion = ( arr, pokemonGame ) => {
        const movesByGame = []
        //make a separate array instead
        //push the moves into the erray only if the match the game
        //return the array
        //this way the value False doesn't get pushed to the array
        arr.map( move => {
            let version = move.version_group_details;
            if ( version[ version.length - 1 ].version_group.name === pokemonGame ) {
                movesByGame.push(
                    {
                        name: move.move.name,
                        level: version[ version.length - 1 ].level_learned_at
                    }
                )

            }
            return true;
        } );

        return movesByGame;
    }

    //func will search through games until it finds a non empty list of moves
    const latestAvailableMoves = ( arr, movesArr ) => {
        let j = 0
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
    const levelUpMovesByGame = movesByGameVersion( levelUpMoves, 'ultra-sun-ultra-moon' );

    const tutorMoves = movesByLearnedMethod( 'tutor' );
    let tutorMovesByGame = movesByGameVersion( tutorMoves, 'ultra-sun-ultra-moon' );

    if ( tutorMovesByGame.length === 0 ) {
        tutorMovesByGame = latestAvailableMoves( tutorMovesByGame, tutorMoves );
    }

    const tmMoves = movesByLearnedMethod( 'machine' );
    let tmMovesByGame = movesByGameVersion( tmMoves, 'ultra-sun-ultra-moon' );

    if ( tmMovesByGame.length === 0 ) {
        tmMovesByGame = latestAvailableMoves( tmMovesByGame, tmMoves );
    }

    const eggMoves = movesByLearnedMethod( 'egg' );
    let eggMovesByGame = movesByGameVersion( eggMoves, 'ultra-sun-ultra-moon' );

    if ( eggMovesByGame.length === 0 ) {
        eggMovesByGame = latestAvailableMoves( eggMovesByGame, eggMoves );
    }

    levelUpMovesByGame.sort( compare );

    return (
        <div></div>
    )
}

export default Moves

//filter through all the moves and return the matching game first
//then filter by method next