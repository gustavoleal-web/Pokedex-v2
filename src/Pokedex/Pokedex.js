import React, { useState, useEffect } from 'react';
import MoreInfo from './MoreInfo/MoreInfo'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import styles from './Pokedex.module.css';
import stylesTypes from './pokeTypes.module.css'
import { Spinner } from 'reactstrap';

const Pokedex = ( { id, clickedPoke } ) => {

    const [ state, setState ] = useState( [] );
    const [ type1, setType1 ] = useState( '' )
    const [ type2, setType2 ] = useState( '' )
    const [pokeForms, setPokeForms] = useState('')

    useEffect( () => {
        const fetchData = async () => {
            try {
                //think about switching to using https://pokeapi.co/api/v2/pokemon-species/id 
                //it includes so much information like mega evolution and different forms
                let pokemon = await axios.get( `https://pokeapi.co/api/v2/pokemon/${ id }` )
                let pokemonEntries = pokemon.data;
                setState( pokemonEntries );
                
                if(pokemonEntries.forms.length >= 2) {
                     setPokeForms(pokemonEntries.forms)
                }
               

                if ( pokemonEntries.types.length === 2 ) {
                    setType1( stylesTypes[ pokemonEntries.types[ 0 ].type.name ] )
                    setType2( stylesTypes[ pokemonEntries.types[ 1 ].type.name ] )
                }
                else {
                    setType1( stylesTypes[ pokemonEntries.types[ 0 ].type.name ] )
                }

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

                       { /* For pokemons that have 2 types it will render both otherwise just the one type */}
                        { state.types.length === 2
                            ? <div style={ { display: 'flex' } }>
                                <p className={ `${ type1 } ${ styles.fill }` }>{ state.types[ 0 ].type.name }</p>
                                <p className={ `${ type2 } ${ styles.fill }` }>{ state.types[ 1 ].type.name }</p>
                            </div>
                            : <p className={ `${ type1 } ${ styles.fill }` }>{ state.types[ 0 ].type.name }</p>
                        }
                        <MoreInfo
                            name={ state.name }
                            abilities={ state.abilities }
                            sprites={ state.sprites }
                            weight={ state.weight }
                            height={ state.height }
                            moves={state.moves}
                            pokeForms={pokeForms}
                            clickedPoke={clickedPoke}
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