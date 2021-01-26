const filterEvolutionsTriggers = ( fetchedEvoChain ) => {
    let evosAndMethods = []

    //this works for pokemon whose second evo is split
    if ( fetchedEvoChain.evolves_to.length === 1 ) {
        evosAndMethods.push( {
            name: fetchedEvoChain.species.name,
            evolutionDetails: {
                nextEvo: fetchedEvoChain.evolves_to[ 0 ].species.name,
                howToEvolve: fetchedEvoChain.evolves_to[ 0 ].evolution_details[ 0 ]
            }
        } );

        //first evolution and alternative second evolution ex: gloom can evolve into vileplume or bellossom
        if ( fetchedEvoChain.evolves_to[ 0 ].evolves_to.length !== 0 ) {
            for ( let i = 0; i < fetchedEvoChain.evolves_to[ 0 ].evolves_to.length; i++ ) {

                evosAndMethods.push( {
                    //fetchedEvoChain.evolves_to[ 0 ].species.name
                    name: fetchedEvoChain.evolves_to[ 0 ].species.name,
                    evolutionDetails: {
                        nextEvo: fetchedEvoChain.evolves_to[ 0 ].evolves_to[ i ].species.name,
                        howToEvolve: fetchedEvoChain.evolves_to[ 0 ].evolves_to[ i ].evolution_details[ 0 ]
                    }
                } );
            }
        }
    }

    //this for pokemons whose first evo is split ex: wurmple can evolve into 2 different kinds
    else if ( fetchedEvoChain.evolves_to.length === 2 ) {
        for ( let i = 0; i < fetchedEvoChain.evolves_to.length; i++ ) {
            evosAndMethods.push( {
                name: fetchedEvoChain.species.name,
                evolutionDetails: {
                    nextEvo: fetchedEvoChain.evolves_to[ i ].species.name,
                    howToEvolve: fetchedEvoChain.evolves_to[ i ].evolution_details[ 0 ]
                }
            } );

            if ( fetchedEvoChain.evolves_to[ i ].evolves_to.length !== 0 ) {
                evosAndMethods.push( {
                    name: fetchedEvoChain.evolves_to[ i ].species.name,
                    evolutionDetails: {
                        nextEvo: fetchedEvoChain.evolves_to[ i ].evolves_to[ 0 ].species.name,
                        howToEvolve: fetchedEvoChain.evolves_to[ i ].evolves_to[ 0 ].evolution_details[ 0 ]
                    }
                } );
            }
        }
    }
    //pokemon that can evolve into more than 3 different pokemon from the very beginning. ex: eevee
    else if ( fetchedEvoChain.evolves_to.length > 2 ) {

        for ( let i = 0; i < fetchedEvoChain.evolves_to.length; i++ ) {
            //to retrive the current (which is the last in the array) evolution method
            //Ex: lefeon now evolves with a leaf stone when it use to evolve at a certain location
            let length = fetchedEvoChain.evolves_to[ i ].evolution_details.length - 1;

            evosAndMethods.push( {
                name: fetchedEvoChain.species.name,
                evolutionDetails: {
                    nextEvo: fetchedEvoChain.evolves_to[ i ].species.name,
                    howToEvolve: fetchedEvoChain.evolves_to[ i ].evolution_details[ length ]
                }
            } );
        }
    }
    
    return evosAndMethods;
}

export default filterEvolutionsTriggers;

