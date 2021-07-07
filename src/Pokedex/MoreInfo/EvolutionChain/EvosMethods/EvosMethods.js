import React, { useState, useEffect, useRef } from 'react';
import IndividualMethods from './IndividualEvosMethods/IndividualMethods';
import Pokedex from '../../../Pokedex';
import styles from './EvosMethods.module.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

const EvosMethods = ( { methods, id } ) => {
    const isMounted = useRef(false);
    const [ sprite, setSprite ] = useState( null );
    const [ clickedPokemon, setClickedPokemon ] = useState( null );

    let allWaysToEvolve = [];
    let basePokemon = methods.length !== 0 ? <h5 >{ methods[ 0 ].name.toUpperCase() }</h5> : null;

    const onClickHandler = ( name ) => {
        setClickedPokemon(
            <div>
                <Pokedex id={ name } />
            </div>
        )
    }


    useEffect( () => {
        isMounted.current = true;

        const fetchData = async () => {
            if ( isMounted ) {
                try {
                    let pokemon = await axios.get( ` https://pokeapi.co/api/v2/pokemon-form/${ methods[ 0 ].name }/` );
                    setSprite( pokemon.data.sprites.front_default )
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
    }, [ methods ] );

    methods.map( ( m ) => {
        let removedFalseValues = {};
        let name = m.name;
        let nextEvo = m.evolutionDetails.nextEvo;

        Object.entries( m.evolutionDetails.howToEvolve ).map( entry => {
            //removes all the object prorties with null, false or empty values  
            if ( entry[ 1 ] !== null && entry[ 1 ] !== '' && entry[ 1 ] !== false ) {

                if ( entry[ 1 ].name ) {
                    removedFalseValues.name = name;
                    removedFalseValues.evolvesTo = nextEvo;
                    removedFalseValues[ entry[ 0 ] ] = entry[ 1 ].name;
                }

                else {
                    removedFalseValues[ entry[ 0 ] ] = entry[ 1 ];
                }
            }
            return true;
        } );

        allWaysToEvolve.push( removedFalseValues );
        return true;
    } );

    return (
        <div className={ styles.flex }>
            <Card className={ styles.card }>
                <Card.Img
                    variant="top" src={ `${ sprite }` }
                    bsPrefix={ styles.pokeSprite }
                    onClick={ () => onClickHandler( methods[ 0 ].name ) }
                    className={ styles.pokeSprite }
                />
                <Card.Body className={ styles.basePokemonContainer }>
                    <Card.Title>{ basePokemon }</Card.Title>
                </Card.Body>
            </Card>

            { clickedPokemon }

            {
                allWaysToEvolve.length === 0 ? null : allWaysToEvolve.map( ( object, i ) =>
                    <IndividualMethods obj={ object } key={ i } id={id}/> )
            }
        </div >
    )
}

export default React.memo( EvosMethods );