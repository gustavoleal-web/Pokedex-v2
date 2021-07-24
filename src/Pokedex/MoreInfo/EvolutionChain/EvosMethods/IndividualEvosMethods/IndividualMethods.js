import React, { useEffect, useRef, useState } from 'react';
import Pokedex from '../../../../Pokedex'
import styles from './individualMethos.module.css'
import pokeball from '../../../../../img/icons/pokeball.png';
import smallPokeball from '../../../../../img/icons/small_pokeball.png';

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Card from 'react-bootstrap/Card';

const IndividualMethods = ( { obj, id } ) => {
    const isMounted = useRef( false );
    const [ clickedPokemon, setClickedPokemon ] = useState( null );
    const [ sprite, setSprite ] = useState( {
        frontView: null,
        styles: null
    } );

    const [ itemSprite, setItemSprite ] = useState( null );

    let pokemonName;
    let evolutionInfo;

    const onClickHandler = ( name ) => {
        setClickedPokemon( <Pokedex id={ name } /> )
    }

    function renameKeys( obj, newKeys ) {
        const keyValues = Object.keys( obj ).map( key => {
            const newKey = newKeys[ key ] || key;
            return { [ newKey ]: obj[ key ] };
        } );
        return Object.assign( {}, ...keyValues );
    }

    const newKeys = {
        evolvesTo: 'evolution',
        min_level: 'Lv',
        min_happiness: 'happiness',
        held_item: 'holding',
        party_species: 'have_in_party',
        trade_species: 'trade_with'
    };
    const renamedObj = renameKeys( obj, newKeys );

    useEffect( () => {
        isMounted.current = true;

        const fetchData = async () => {
            if ( isMounted.current ) {
                try {
                    let pokemon = await axios.get( ` https://pokeapi.co/api/v2/pokemon-form/${ renamedObj.evolution }/` );
                    setSprite( {
                        frontView: pokemon.data.sprites.front_default,
                        styles: styles.pokeSprite
                    } );
                }
                catch ( e ) {
                    try {
                        let pokemon = await axios.get( ` https://pokeapi.co/api/v2/pokemon-form/${ id }/` );
                        setSprite( {
                            frontView: pokemon.data.sprites.front_default,
                            styles: styles.pokeSprite
                        } );
                    }
                    catch ( e ) {
                        setSprite( {
                            frontView: pokeball,
                            styles: styles.pokeball
                        } );
                    }
                }
            }

        }
        fetchData();

        return () => {
            isMounted.current = false;
        };
    }, [ renamedObj.evolution, id ] );


    //ITEMS
    useEffect( () => {
        isMounted.current = true;

        const fetchData = async () => {

            if ( isMounted.current && Object.keys( obj ).includes( 'item' ) ) {
                try {
                    let item = await axios.get( ` https://pokeapi.co/api/v2/item/${ obj.item }/` );
                    setItemSprite( item.data.sprites.default );
                }
                catch ( e ) {
                    setItemSprite( smallPokeball );
                }
            }
        }
        fetchData();

        return () => {
            isMounted.current = false;
        };
    }, [ obj, obj.item ] );



    return (
        < >
            <Card className={ styles.card } >

                {
                    sprite === null
                        ? null
                        : <Card.Img variant="top"
                            bsPrefix={ sprite.styles }
                            className={ sprite.styles }
                            src={ `${ sprite.frontView }` }
                            onClick={ () =>
                                onClickHandler( renamedObj.evolution ) }

                        />
                }

                <Card.Body>

                    {
                        Object.keys( renamedObj ).map( key => {


                            if ( renamedObj[ key ] === true ) {
                                evolutionInfo = <Card.Text key={ uuidv4() }>{ key }</Card.Text>
                            }

                            else if ( key === 'gender' && renamedObj[ key ] === 1 ) {
                                evolutionInfo = <Card.Text key={ uuidv4() } >{ `${ key }: female` }</Card.Text>
                            }

                            else if ( key === 'gender' && renamedObj[ key ] === 2 ) {
                                evolutionInfo = <Card.Text key={ uuidv4() }>{ `${ key }: male` }</Card.Text>
                            }

                            else if ( key === 'name' ) {
                                //prevents the name from being repeated for every evolution
                                evolutionInfo = null;
                            }
                            else if ( key === 'evolution' ) {
                                pokemonName = <h5 key={ uuidv4() }>{ renamedObj[ key ].replace( '-', ' ' ).toUpperCase() }</h5>
                            }

                            else if ( key === 'trigger' ) {
                                evolutionInfo = <Card.Text key={ uuidv4() }>{ renamedObj[ key ].replace( '-', ' ' ) }</Card.Text>
                            }

                            else {
                                evolutionInfo =
                                    <Card.Text key={ uuidv4() }>
                                        { `${ key.replaceAll( '_', ' ' ) }: ${ renamedObj[ key ] }` }
                                        { itemSprite !== null ? <img src={ `${ itemSprite }` } alt='item' style={ { marginLeft: '5px' } } /> : null }
                                    </Card.Text>



                            }

                            return evolutionInfo;
                        } ) }

                    <Card.Title>  { pokemonName }</Card.Title>
                </Card.Body>

                { clickedPokemon }

            </Card>



        </>
    )
}

export default IndividualMethods;