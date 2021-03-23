import React, { useState, useEffect } from 'react';
import MoreInfo from './MoreInfo/MoreInfo';
import Sprites from './Sprites/Sprites';
import axios from 'axios';

import styles from './Pokedex.module.css';
import stylesTypes from './pokeTypes.module.css'
import backgroundTypes from './pokeTypesBackgrondColor.module.css'
import { Spinner, } from 'reactstrap';
//import Button from 'react-bootstrap/Button';

const Pokedex = ( { id, clickedPoke } ) => {
    const [ state, setState ] = useState( [] );
    const [ type1, setType1 ] = useState( '' );
    const [ type2, setType2 ] = useState( '' );
    const [ typeColorBackground, setBackground ] = useState( '' );
    const [ pokeForms, setPokeForms ] = useState( '' );

    // const [ modal, setModal ] = useState( false );
    // const toggle = () => setModal( !modal );


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
                    let pokemon = await axios.get(
                        `https://pokeapi.co/api/v2/pokemon/${ id }/`,
                        { 'headers': { 'Access-Control-Allow-Origin': '*' } } );
                    
                    if ( pokemon.status === 200 ) {
                        setStateFromReq( pokemon.data )
                    }


                }
                catch ( e ) {
                    let pokemon = await axios.get(
                        `https://pokeapi.co/api/v2/pokemon/${ id }`,
                        { 'headers': { 'Access-Control-Allow-Origin': '*' } } );
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


    return (

        <>
            { Object.keys( state ).length === 0 ? <Spinner color='primary' style={ { display: 'flex' } } /> :

                <div className={ `${ styles.infoContainer } ${ typeColorBackground }` }>
                    <div>

                        <Sprites pokeImg={ state.sprites } name={ state.name } showModalHandler={ showModalHandler } />
                        <p>No.{ state.id }:  { state.name.toUpperCase() }</p>


                        { /* For pokemons that have 2 types it will render both otherwise just the one type */ }
                        {/*<Button onClick={ () => toggle() }>i</Button>*/ }
                        {/*
                         <Button
                            variant='outline-info'
                            onClick={ () => showModalHandler( true ) }
                            style={ {
                                width: '12%',
                                borderRadius: '100%'
                            } }>i
                            
                            </Button>
                        */ }

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
                                backgroundColor={ typeColorBackground }
                                clickedPoke={ clickedPoke }
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