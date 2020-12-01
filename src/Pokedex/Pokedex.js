import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Pokedex.module.css';

const Pokedex = ( { id } ) => {
    const [ state, setState ] = useState( [] );

    useEffect( () => {


        const fetchData = async () => {
            try {
                let pokemon = await axios.get( `https://pokeapi.co/api/v2/pokemon/${ id }` )
                let pokemonEntries = pokemon.data;
                setState( pokemonEntries );
            }
            catch ( e ) {
                console.log( e );
            }
        }
        fetchData();

    }, [] );

    return (
        <>
            { Object.keys( state ).length === 0 ? <h1>Loading...</h1> :
                <div className={styles.infoContainer}>
                    <div>
                        <p>No.{ state.id }:  { state.name.toUpperCase() }</p>
                        <img src={ `${ state.sprites.front_default }` } alt={ state.name } />

                        { state.types.length === 2
                            ? <p>{ state.types[ 0 ].type.name }, { state.types[ 1 ].type.name }</p>
                            : <p>{ state.types[ 0 ].type.name }</p>
                        }

                    </div>
                    <div className={styles.stats}>
                        {
                            state.stats.map( ( stat ) => 
                            <p>{ stat.stat.name }: { stat.base_stat }</p> 
                            )
                        }
                    </div>

                </div>
            }
        </>
    )
}

export default Pokedex;