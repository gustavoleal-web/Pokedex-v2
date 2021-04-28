import React from 'react';

const Moves = ( { moves } ) => {

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
            return version[ version.length - 1 ].move_learn_method.name === method;
        } );

        return levelUpMoves
    }

    const movesByGameVersion = ( arr, pokemonGame ) => {
        //make a separate array instead
        //push the moves into the erray only if the match the game
        //return the array
        //this way the value False doesn't get pushed to the array
        const movesByGame = arr.map( move => {
            let version = move.version_group_details;
            if ( version[ version.length - 1 ].version_group.name === pokemonGame ) {
                return {
                    name: move.move.name,
                    level: version[ version.length - 1 ].level_learned_at
                }

            }
            else {
                return false;
            };

        } );

        return movesByGame;
    }


    const levelUpMoves = movesByLearnedMethod( 'level-up' );
    const levelUpMovesByGame = movesByGameVersion( levelUpMoves, 'ultra-sun-ultra-moon' );

    const tutorMoves = movesByLearnedMethod( 'tutor' );
    const tutorMovesByGame = movesByGameVersion( tutorMoves, 'omega-ruby-alpha-sapphire' );

    const tmMoves = movesByLearnedMethod( 'machine' );
    const eggMoves = movesByLearnedMethod( 'egg' );
    

    levelUpMovesByGame.sort( compare );

    return (
        <div></div>
    )
}

export default Moves