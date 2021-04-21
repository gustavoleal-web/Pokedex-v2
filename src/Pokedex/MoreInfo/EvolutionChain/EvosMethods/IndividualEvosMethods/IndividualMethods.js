import React, { useEffect, useState } from 'react';
import Pokedex from '../../../../Pokedex'
import styles from './individualMethos.module.css'

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const IndividualMethods = ( { obj } ) => {
    const [ clickedPokemon, setClickedPokemon ] = useState( null );
    const [ sprite, setSprite ] = useState( '' );
    let pokemonName;

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
        let isMounted = true;

        const fetchData = async () => {
            if ( isMounted ) {
                try {
                    let pokemon = await axios.get( ` https://pokeapi.co/api/v2/pokemon-form/${ renamedObj.evolution }/` );
                    setSprite( pokemon.data.sprites.front_default )
                }
                catch ( e ) {
                    console.log( e );
                }
            }

        }
        fetchData();

        return () => {
            isMounted = false;
        };
    }, [ renamedObj.evolution ] );



    return (
        <div className={ `${ styles.width } ` } >
            <hr />
            {
                Object.keys( renamedObj ).map( key => {
                    let evolutionInfo;

                    if ( renamedObj[ key ] === true ) {
                        evolutionInfo = <p key={ uuidv4() }>{ key }</p>
                    }

                    else if ( key === 'gender' && renamedObj[ key ] === 1 ) {
                        evolutionInfo = <p key={ uuidv4() } >{ `${ key }: female` }</p>
                    }

                    else if ( key === 'gender' && renamedObj[ key ] === 2 ) {
                        evolutionInfo = <p key={ uuidv4() }>{ `${ key }: male` }</p>
                    }

                    else if ( key === 'name' ) {
                        //prevents the name from being repeated for every evolution
                        evolutionInfo = null;
                    }
                    else if ( key === 'evolution' ) {
                        pokemonName = <h5 key={ uuidv4() }>{ renamedObj[ key ].replace( '-', ' ' ).toUpperCase() }</h5>
                    }

                    else if ( key === 'trigger' ) {
                        evolutionInfo = <p key={ uuidv4() }>{ renamedObj[ key ].replace( '-', ' ' ) }</p>
                    }

                    else {
                        evolutionInfo = <p key={ uuidv4() }>{ `${ key.replaceAll( '_', ' ' ) }: ${ renamedObj[ key ] }` }</p>
                    }

                    return evolutionInfo;
                } )
            }

            {
                sprite
                    ? <img
                        src={ `${ sprite }` }
                        alt='pokemon sprite'
                        onClick={ () => onClickHandler( renamedObj.evolution ) }
                        className={ styles.pokeSprite }
                    />
                    : null
            }
            { pokemonName }
            { clickedPokemon }
        </div>
    )
}

export default IndividualMethods;