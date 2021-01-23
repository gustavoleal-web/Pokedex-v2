
const setEvoChain = ( fetchedEvoChain ) => {
    const pokeEvoLine = [];
    //first evolution
    if ( fetchedEvoChain.evolves_to.length !== 0 ) {
        pokeEvoLine.push( fetchedEvoChain.species.name );
        pokeEvoLine.push( fetchedEvoChain.evolves_to[ 0 ].species.name );

        //second evolution and alternative second evolution
        if ( fetchedEvoChain.evolves_to[ 0 ].evolves_to.length !== 0 ) {
            for ( let i = 0; i < fetchedEvoChain.evolves_to[ 0 ].evolves_to.length; i++ ) {
                pokeEvoLine.push( fetchedEvoChain.evolves_to[ 0 ].evolves_to[ i ].species.name )
            }
        }
    }
    return pokeEvoLine;
}

export default setEvoChain;