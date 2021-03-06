import React, { useState, useEffect } from 'react';
import PokedexEntries from './PokedexEntries/PokedexEntries'
import Abilities from './Abilities/Abilities';
import Training from './Training/Training';
import EvolutionChain from './EvolutionChain/EvolutionChain';
import Breeding from './Breeding/Breeding.js'
import AlternateForms from './AlternateForms/alternateForms';
import Varieties from './Varieties/Varieties';
import ShinyPoke from './ShinyPoke/ShinyPoke';
import Stats from './Stats/Stats';
import ResistanceWeakness from './ResistanceWeakness/ResistanceWeakness'
import styles from './moreInfo.module.css';
import maleIcon from '../../img/icons/male-gender.png'
import femaleIcon from '../../img/icons/female-gender.png'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
//import { Modal, ModalHeader, Modal.Body } from 'reactstrap';
// import { Route, Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

const MoreInfo = ( {
    name,
    abilities,
    sprites,
    weight,
    height,
    moves,
    pokeForms,
    stats,
    types,
    type1,
    type2,
    clickedPoke,
    backgroundColor,
    showModal,
    showModalHandler
} ) => {

    const [ evolutionChainUrl, setUrl ] = useState( '' );
    const [ varieties, setVarieties ] = useState( '' );
    const [ trainingData, setTrainigData ] = useState( {} );
    const [ pekedexEntries, setPokedexEntries ] = useState( {} );
    const [ gender, setGender ] = useState( {} );
    const [ eggData, setEggData ] = useState( {} );
    const commonAbilities = [];
    const hiddenAbilities = [];

    //from reactstrap
    //const closeBtn = <button className="close" onClick={ toggle }>&times;</button>;


    //converted the value to meeters then to ft
    let feet = ( height / 10 ) * 3.281;
    feet = feet.toFixed( 2 )

    let weightInKg = weight / 10;

    for ( let i = 0; i < abilities.length; i++ ) {
        if ( abilities[ i ].is_hidden ) {
            hiddenAbilities.push( abilities[ i ].ability )
        }
        else {
            commonAbilities.push( abilities[ i ].ability )
        }
    }

    //so the full pokemon name is displayed and not part of it after the if check
    //ex: raichu will keep its raichu-alolan name   
    const pokeName = name;

    //these pokemon originally come with a - in their name so their name should not be modified
    // if ( name !== 'mr-mime'
    //     && name !== 'mime-jr'
    //     && name !== 'mr-rime'
    //     && name !== 'nidoran-f'
    //     && name !== 'nidoran-m'
    //     && name !== 'ho-oh'
    //     && name !== 'porygon-z'
    //     && name !== 'tapu-bulu'
    //     && name !== 'tapu-koko'
    //     && name !== 'tapu-lele'
    //     && name !== 'tapu-fini'
    //     && name !== 'jangmo-o'
    //     && name !== 'hakamo-o'
    //     && name !== 'kommo-o'
    //     && name.includes( '-' ) ) {

    //     let end = name.indexOf( '-' );
    //     name = name.substring( 0, end );
    //     console.log(name)
    // }

    useEffect( () => {
        let isMounted = true;
        const fetchData = async () => {
            if ( isMounted ) {

                try {

                    let pokemon = await axios.get( `https://pokeapi.co/api/v2/pokemon-species/${ name }/`, { headers: { 'X-Custom-Header': '*' } } );
                    let fetchedEvoChainURL = pokemon.data.evolution_chain.url;


                    if ( pokemon.data.gender_rate === -1 ) {
                        setGender( 'genderless' )
                    }
                    else {
                        let genderRate = {};
                        let female = ( 12.5 * pokemon.data.gender_rate );
                        let male = 100 - female;
                        genderRate.male = male;
                        genderRate.female = female;
                        setGender( genderRate );
                    }

                    let fetechedTraining = {};
                    ( {
                        base_happiness: fetechedTraining.baseHappiness,
                        capture_rate: fetechedTraining.captureRate,
                        growth_rate: fetechedTraining.grouthRate
                    } = pokemon.data );


                    let fetchedPokedEntries = {};
                    ( {
                        flavor_text_entries: fetchedPokedEntries.pokedexTextEntries,
                        genera: fetchedPokedEntries.genus,
                        generation: fetchedPokedEntries.generation
                    } = pokemon.data );

                    let fetchedEggData = {};

                    ( {
                        egg_groups: fetchedEggData.eggGroups,
                        hatch_counter: fetchedEggData.hatchCounter
                    } = pokemon.data )

                    setTrainigData( fetechedTraining );
                    setPokedexEntries( fetchedPokedEntries );
                    setEggData( fetchedEggData );
                    setUrl( fetchedEvoChainURL );

                    pokemon.data.varieties ? setVarieties( pokemon.data.varieties ) : setVarieties( '' );
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

    }, [ name ] );


    let showSpritesVersion = null;
    //let showGeneralData = null;
    let showTypes = null;
    let showGender = null;
    let shoWabilities = null;
    let showTraining = null;
    let showEvolution = null;
    let showBreeding = null;
    let showVarieties = null;
    let showForms = null;
    let showStats = null;
    let showDamaga = null;


    if ( sprites.versions[ 'generation-viii' ].icons.front_default ) {
        showSpritesVersion =
            <img
                src={ `${ sprites.versions[ 'generation-viii' ].icons.front_default }` }
                alt={ { name } }
            />
    }

    // if ( Object.keys( pekedexEntries ).length !== 0 ) {
    //     showGeneralData = 
    // }

    if ( types.length === 2 ) {
        showTypes = (
            <div style={ { display: 'flex' } }>
                <p className={ `${ type1 } ${ styles.fill }` }>{ types[ 0 ].type.name }</p>
                <p className={ `${ type2 } ${ styles.fill }` }>{ types[ 1 ].type.name }</p>
            </div>
        )
    }
    else {
        showTypes =
            <p
                className={ `${ type1 } ${ styles.fill }` }>
                { types[ 0 ].type.name }
            </p>
    }

    if ( gender === 'genderless' ) {
        showGender = <p>Genderless</p>
    }
    else {
        showGender = (
            <div>
                <p><img src={ maleIcon } alt='male' /> { gender.male }%</p>
                <p><img src={ femaleIcon } alt='female' /> { gender.female }%</p>
            </div>
        )
    }

    shoWabilities = <Modal.Body >
        <hr
            className={ `${ styles.hrAbilities } ${ styles.hrMargin }` }
            style={ { marginTop: '40px', marginBottom: '40px' } }
        />
        <h5>Common</h5>
        <Abilities abilities={ commonAbilities } />

        <h5>Hidden</h5>
        <Abilities abilities={ hiddenAbilities } />
    </Modal.Body>

    if ( Object.keys( trainingData ).length !== 0 ) {
        showTraining =
            <Modal.Body>
                <hr className={ `${ styles.hrTraining } ${ styles.hrMargin }` } />
                <Training data={ trainingData } />
            </Modal.Body>
    }

    if ( Object.keys( eggData ).length !== 0 ) {
        showBreeding =
            <Modal.Body>
                <hr className={ `${ styles.hrBreeding } ${ styles.hrMargin }` } />
                <Breeding eggData={ eggData } />
            </Modal.Body>
    }

    if ( varieties.length !== 0 ) {
        showVarieties =
            <Modal.Body>
                <hr className={ `${ styles.hrVarieties } ${ styles.hrMargin }` } />
                <Varieties varieties={ varieties } clickedPoke={ clickedPoke } />
            </Modal.Body>
    }

    if ( pokeForms.length !== 0 ) {
        showForms =
            <Modal.Body>
                <hr className={ `${ styles.hrForms } ${ styles.hrMargin }` } />
                <div className={ styles.formsContainer }>
                    { pokeForms.map( poke => <AlternateForms pokeForms={ poke } key={ poke.url } /> ) }
                    <ShinyPoke shinySprite={ sprites.front_shiny } />
                </div>
            </Modal.Body>
    }

    if ( stats.length !== 0 ) {
        showStats =
            <Modal.Body>
                <hr className={ `${ styles.hrStats } ${ styles.hrMargin }` } />
                { stats.length !== 0 ? <Stats stats={ stats } /> : null }
            </Modal.Body>

    }

    if ( types.length !== 0 ) {
        showDamaga =
            <Modal.Body>
                <hr className={ `${ styles.hrDamage } ${ styles.hrMargin }` } />
                { types.length !== 0 ? <ResistanceWeakness type={ types } key={ uuidv4() } /> : null }
            </Modal.Body>

    }

    showEvolution =
        <Modal.Body style={ { display: 'block' } }>
            <hr className={ `${ styles.hrEvolution } ${ styles.hrMargin }` } />
            <EvolutionChain clickedPoke={ clickedPoke } evolutionChainUrl={ evolutionChainUrl } />
        </Modal.Body>

    return (
        <div>
            <Modal
            centered
                size="lg"
                show={ showModal }
                onHide={ () => showModalHandler( false ) }
                aria-labelledby="example-modal-sizes-title-sm">

                <Modal.Header
                    closeButton
                    className={ backgroundColor }>
                    { pokeName.toUpperCase() }
                    { showSpritesVersion }
                </Modal.Header>

                <span style={ { fontSize: '18px', textAlign: 'center' } }>
                    <Modal.Body>
                        <hr className={ `${ styles.hrGeneral } ${ styles.hrMargin }` } />
                        { Object.keys( pekedexEntries ).length !== 0 ? <PokedexEntries pokedexData={ pekedexEntries } /> : <h5>Loading...</h5> }

                        { showTypes }

                        <p>Weight: { weightInKg } kg</p>
                        <p>Height: { feet } ft</p>

                        <h5>Gender</h5>
                        { showGender }

                    </Modal.Body>
                    { shoWabilities }
                    { showTraining }
                    { showEvolution }
                    { showBreeding }
                    { showVarieties }
                    { showForms }
                    { showStats }
                    { showDamaga }
                    {/* 
                        <Modal.Body>
                        <hr className={ `${ styles.hrStats } ${ styles.hrMargin }` } />
                        <div >
                            {
                                stats.map( ( stat ) =>
                                    <span key={ uuidv4() } className={ styles.statsContainer }>
                                        <p className={ styles.statsName }>{ stat.stat.name }: </p>
                                        <p className={ styles.statsValue }>{ stat.base_stat } </p>
                                    </span>

                                )
                            }
                        </div>
                        </Modal.Body>
                    */}

                </span>
            </Modal>
        </div>
    );
}

export default React.memo( MoreInfo );