import React, { useState, useEffect } from 'react';
import MoreInfo from './MoreInfo/MoreInfo';
import Sprites from './Sprites/Sprites';
import axios from 'axios';

import styles from './Pokedex.module.css';
import stylesTypes from './pokeTypes.module.css'
import backgroundTypes from './pokeTypesBackgrondColor.module.css'
import Spinner from 'react-bootstrap/Spinner';
//import Button from 'react-bootstrap/Button';

const Pokedex = ( { id } ) => {
    const [ state, setState ] = useState( [] );
    const [ type1, setType1 ] = useState( '' );
    const [ type2, setType2 ] = useState( '' );
    const [ typeColorBackground, setBackground ] = useState( '' );
    const [ pokeForms, setPokeForms ] = useState( '' );
    let globalRearangedName = null;
    let globalRearangedId = null;


    //from react-strap
    const [ lgShow, setLgShow ] = useState( false );
    const showModalHandler = ( bool ) => {
        setLgShow( bool )
    }

    const setStateFromReq = ( pokemonData ) => {
        let fetchedPokemon = pokemonData;
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

    useEffect( () => {
        let isMounted = true;
        const fetchData = async () => {
            if ( isMounted ) {
                try {
                     //some file paths need the / at the end
                     //the api has some pokemon without the / at the end
                     //this is why 2 different get request are used
                    let pokemon = await axios.get( `https://pokeapi.co/api/v2/pokemon/${ id }/` );
                   
                    if ( pokemon.status === 200 ) {
                        setStateFromReq( pokemon.data )
                    }
                }
                catch ( e ) {
                   
                    let pokemon = await axios.get( `https://pokeapi.co/api/v2/pokemon/${ id }` );

                    if ( pokemon.status === 200 ) {
                        setStateFromReq( pokemon.data )
                    }
                    else { throw new Error( 'could not reach url' ) }
                }
            }
            return () => {
                isMounted = false;
            };

        }
        fetchData();

    }, [ id ] );


    //some pokemon had their name rearranged for better reading clarity this includes pokemon with 'mega' in their name.
    //ex charizard-gmax will display gmax charizard
    //Pokemon with other forms display and id from the API resulting in an incorrect national Pokedex number
    //The correct id is extrated from the url in the species (state.species.url)
    //the state is not modified. 

    if ( Object.keys( state ).length !== 0 ) {
        const stateCopy = { ...state }

        for ( let key in stateCopy ) {
            if ( key === 'is_default' && stateCopy[ 'is_default' ] === false ) {
                let updateName = stateCopy.name.split( '-' );
                let end = stateCopy.species.url.length - 1;
                globalRearangedId = stateCopy.species.url.slice( 42, end );

                if ( updateName.length === 3 ) {
                    globalRearangedName = `${ updateName[ 1 ] } ${ updateName[ 0 ] } ${ updateName[ 2 ] }`;
                }
                else if ( updateName.length === 2 ) {
                    globalRearangedName = `${ updateName[ 1 ] } ${ updateName[ 0 ] }`;
                }

            }
        }
    }


    return (

        <>
            { Object.keys( state ).length === 0 ? <Spinner animation='grow' style={ { justifySelf: 'center' } } /> :

                <div className={ `${ styles.infoContainer } ${ typeColorBackground }` }>
                    <div>

                        <Sprites pokeImg={ state.sprites } name={ state.name } showModalHandler={ showModalHandler } />

                        {
                            globalRearangedName === null
                                ? <p>No.{ state.id }:  { state.name.toUpperCase() }</p>
                                : <p>No.{ globalRearangedId }:  { globalRearangedName.toUpperCase() }</p>
                        }


                        { lgShow ?
                            <MoreInfo
                                id={ id }
                                name={ state.name }
                                abilities={ state.abilities }
                                sprites={ state.sprites }
                                weight={ state.weight }
                                height={ state.height }
                                moves={ state.moves }
                                pokeForms={ pokeForms }
                                stats={ state.stats }
                                types={ state.types }
                                type1={ type1 }
                                type2={ type2 }
                                globalRearangedId={ globalRearangedId }
                                backgroundColor={ typeColorBackground }
                                showModal={ lgShow }
                                showModalHandler={ showModalHandler }
                            />
                            : null }
                    </div>
                </div>
            }
        </>
    )
}

export default Pokedex;