import React, { useState, useEffect } from 'react';
import MoreInfo from './MoreInfo/MoreInfo'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import styles from './Pokedex.module.css';
import stylesTypes from './pokeTypes.module.css'
import backgroundTypes from './pokeTypesBackgrondColor.module.css'
import { Spinner } from 'reactstrap';

const Pokedex = ( { id, clickedPoke } ) => {
    //DONE : TODO: look into using offical art work for missing sprites
    //state.sprites.other["official-artwork"].front_default
    const [ state, setState ] = useState( [] );
    const [ type1, setType1 ] = useState( '' );
    const [ type2, setType2 ] = useState( '' );
    const [ typeColorBackground, setBackground ] = useState( '' );
    const [ pokeForms, setPokeForms ] = useState( '' )

    useEffect( () => {
        const fetchData = async () => {
            try {
                let pokemon = await axios.get( `https://pokeapi.co/api/v2/pokemon/${ id }` )
                let fetchedPokemon = pokemon.data;
                setState( fetchedPokemon );
                setBackground( backgroundTypes[ fetchedPokemon.types[ 0 ].type.name ] );

                if ( fetchedPokemon.forms.length >= 1 ) {
                    setPokeForms( fetchedPokemon.forms );
                }

                if ( fetchedPokemon.types.length === 2 ) {
                    setType1( stylesTypes[ fetchedPokemon.types[ 0 ].type.name ] )
                    setType2( stylesTypes[ fetchedPokemon.types[ 1 ].type.name ] )
                }
                else {
                    setType1( stylesTypes[ fetchedPokemon.types[ 0 ].type.name ] )
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

                <div className={ `${ styles.infoContainer } ${ typeColorBackground }` }>
                    <div>
                        <p>No.{ state.id }:  { state.name.toUpperCase() }</p>

                        {/*the API doesn't have images for all the different forms*/ }
                        { state.sprites.other[ "official-artwork" ].front_default !== null
                            ? <img style={ { width: '30%' } } src={ `${ state.sprites.other[ "official-artwork" ].front_default }` } alt={ state.name } />
                            : state.front_default !== null
                                //not all pokemon, especially the varieties have official artwork
                                //so sprites will be shown in place
                                //other wise it will display 'Image N/A'
                                ? <img src={ `${ state.sprites.front_default }` } alt={ state.name } />
                                : <p>Image: N/A</p>
                        }


                        { /* For pokemons that have 2 types it will render both otherwise just the one type */ }
                        { state.types.length === 2
                            ? <div style={ { display: 'flex' } }>
                                <p className={ `${ type1 } ${ styles.fill }` }>{ state.types[ 0 ].type.name }</p>
                                <p className={ `${ type2 } ${ styles.fill }` }>{ state.types[ 1 ].type.name }</p>
                            </div>
                            : <p className={ `${ type1 } ${ styles.fill }` }>{ state.types[ 0 ].type.name }</p>
                        }
                        <MoreInfo
                            id={ id }
                            name={ state.name }
                            abilities={ state.abilities }
                            sprites={ state.sprites }
                            weight={ state.weight }
                            height={ state.height }
                            moves={ state.moves }
                            pokeForms={ pokeForms }
                            backgroundColor={ typeColorBackground }
                            clickedPoke={ clickedPoke }
                        />

                    </div>

                    <div className={ styles.stats }>
                        {
                            state.stats.map( ( stat ) =>
                                <div key={ uuidv4() }>
                                    <p >{ stat.stat.name }: { stat.base_stat }</p>
                                    {/*<div className={styles.statsBar}></div>*/ }
                                </div>

                            )

                        }
                    </div>

                </div>
            }
        </>
    )
}

export default Pokedex;