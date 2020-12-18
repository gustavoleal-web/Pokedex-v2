import React, { useState, useEffect } from 'react';
import MoreInfo from './MoreInfo/MoreInfo'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import styles from './Pokedex.module.css';
import { Spinner } from 'reactstrap';

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

    }, [ id ] );

    return (
        <>
            { Object.keys( state ).length === 0 ? <Spinner color="primary" style={ { display: 'flex' } } /> :

                <div className={ styles.infoContainer }>

                    <div>
                        <p>No.{ state.id }:  { state.name.toUpperCase() }</p>
                        <img src={ `${ state.sprites.front_default }` } alt={ state.name } />

                        { state.types.length === 2
                            ? <p>{ state.types[ 0 ].type.name }, { state.types[ 1 ].type.name }</p>
                            : <p>{ state.types[ 0 ].type.name }</p>
                        }
                        <MoreInfo
                            name={ state.name }
                            abilities={ state.abilities }
                            sprites={ state.sprites }
                            weight={ state.weight }
                            height={ state.height }
                        />

                    </div>
                    <div className={ styles.stats }>
                        {
                            state.stats.map( ( stat ) =>
                                <p key={ uuidv4() }>{ stat.stat.name }: { stat.base_stat }</p>
                            )

                        }
                    </div>

                </div>
            }
        </>
    )
}

export default Pokedex;