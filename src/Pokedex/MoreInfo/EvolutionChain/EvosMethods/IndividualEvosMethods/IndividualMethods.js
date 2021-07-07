import React, { useEffect, useRef, useState } from 'react';
import Pokedex from '../../../../Pokedex'
import styles from './individualMethos.module.css'

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Card from 'react-bootstrap/Card';

const IndividualMethods = ( { obj, id } ) => {
    const isMounted = useRef(false);
    const [ clickedPokemon, setClickedPokemon ] = useState( null );
    const [ sprite, setSprite ] = useState( null );
    const [ itemSprite, setItemSprite ] = useState( null );
    let pokemonName;
    let evolutionInfo;

    const onClickHandler = ( name ) => {
        setClickedPokemon(
            <div>
                <Pokedex id={ name } />
            </div>
        )
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
            if ( isMounted ) {
                try {
                    let pokemon = await axios.get( ` https://pokeapi.co/api/v2/pokemon-form/${ renamedObj.evolution }/` );
                    setSprite( pokemon.data.sprites.front_default )
                }
                catch ( e ) {
                    try {
                        let pokemon = await axios.get( ` https://pokeapi.co/api/v2/pokemon-form/${ id }/` );
                        setSprite( pokemon.data.sprites.front_default )
                    }
                    catch ( e ) {
                        console.log( e )
                    }
                }
            }

        }
        fetchData();

        return () => {
            isMounted.current = false;
        };
    }, [ renamedObj.evolution, id ] );


    //ITMES
    useEffect( () => {
        isMounted.current = true;

        const fetchData = async () => {

            if ( isMounted && Object.keys( obj ).includes( 'item' ) ) {
                try {
                    let item = await axios.get( ` https://pokeapi.co/api/v2/item/${ obj.item }/` );
                    setItemSprite( item.data.sprites.default )
                }
                catch ( e ) {
                    console.log( e );
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
                            bsPrefix={ styles.pokeSprite }
                            className={ styles.pokeSprite }
                            src={ `${ sprite }` }
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
                                        { itemSprite !== null ? <img src={ `${ itemSprite }` } alt="item" /> : null }
                                    </Card.Text>



                            }

                            return evolutionInfo;
                        } ) }

                    <Card.Title>  { pokemonName }</Card.Title>
                </Card.Body>
            </Card>

            { clickedPokemon }

        </>
    )
}

export default IndividualMethods;