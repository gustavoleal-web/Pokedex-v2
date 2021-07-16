import React, { useState, useEffect, useRef } from 'react';
import PokedexEntries from './PokedexEntries/PokedexEntries'
import Abilities from './Abilities/Abilities';
import Training from './Training/Training';
import EvolutionChain from './EvolutionChain/EvolutionChain';
import Moves from './Moves/Moves';
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
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

const MoreInfo = ( {
    id,
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
    globalRearangedId,
    backgroundColor,
    showModal,
    showModalHandler
} ) => {
    const isMounted = useRef( false );
    const [ varieties, setVarieties ] = useState( '' );
    const [ gender, setGender ] = useState( {} );
    const [ error, setError ] = useState( false )
    const commonAbilities = [];
    const hiddenAbilities = [];

    const [ disabled, setDissabled ] = useState( {
        varieties: false,
        forms: false,
        stats: false,
        damage: false,
        moves: false
    } );

    const [ state, setState ] = useState( {
        evolutionChainUrl: '',
        trainingData: {},
        eggData: {},
        pokedexEntries: ''
    } )


    const [ showSelected, setShowSelected ] = useState( null )

    //converted the value to meeters then to ft
    let meters = height / 10;
    let feet = meters * 3.281;
    feet = feet.toFixed( 2 );


    let weightInKg = weight / 10;
    let pounds = weightInKg * 2.2;
    pounds = pounds.toFixed( 2 );

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


    useEffect( () => {
        isMounted.current = true;
        const fetchData = async () => {
            if ( isMounted.current ) {
                let pokemon;
                try {
                    pokemon = await axios.get( `https://pokeapi.co/api/v2/pokemon-species/${ id }/` );
                }
                catch {
                    try {
                        pokemon = await axios.get( `https://pokeapi.co/api/v2/pokemon-species/${ name }/` );
                    }
                    catch {
                        try {
                            pokemon = await axios.get( `https://pokeapi.co/api/v2/pokemon-species/${ globalRearangedId }/` );
                        }
                        catch {
                            setError( true );
                        }

                    }
                }
                if ( pokemon === undefined ) {
                    return false;
                }
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


                let fetchedPokedexEntries = {};
                ( {
                    flavor_text_entries: fetchedPokedexEntries.pokedexTextEntries,
                    genera: fetchedPokedexEntries.genus,
                    generation: fetchedPokedexEntries.generation
                } = pokemon.data );

                let fetchedEggData = {};

                ( {
                    egg_groups: fetchedEggData.eggGroups,
                    hatch_counter: fetchedEggData.hatchCounter
                } = pokemon.data );

                setState( state => (
                    {
                        ...state, evolutionChainUrl: fetchedEvoChainURL,
                        trainingData: fetechedTraining,
                        eggData: fetchedEggData,
                        pokedexEntries: fetchedPokedexEntries
                    }
                ) );
                pokemon.data.varieties ? setVarieties( pokemon.data.varieties ) : setVarieties( '' );
            }
        }
        fetchData();
        return () => {
            isMounted.current = false;
        };

    }, [ id, name, globalRearangedId ] );

    let showSpritesVersion = null;
    let showPokedexEntries = null;
    let showTypes = null;
    let showGender = null;
    let shoWabilities = null;
    let showTraining = null;
    let showEvolution = null;
    let showBreeding = null;
    let showVarieties = null;
    let showForms = null;
    let showStats = null;
    let showDamage = null;
    let showMoves = null;

    if ( error ) {
        showEvolution = <h6>Something went wrong. Try again later.</h6>
        showPokedexEntries = <h6>Something went wrong. Try again later.</h6>
    }

    else {
        showEvolution = <EvolutionChain evolutionChainUrl={ state.evolutionChainUrl } id={ id } />

    }

    if ( sprites.versions[ 'generation-viii' ].icons.front_default ) {
        showSpritesVersion =
            <img
                src={ `${ sprites.versions[ 'generation-viii' ].icons.front_default }` }
                alt={ name }
            />
    }

    if ( types.length === 2 ) {
        showTypes = (
            <div className={ styles.typesContainer }>
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

    if ( Object.keys( state.pokedexEntries ).length !== 0 ) {
        showPokedexEntries = <PokedexEntries pokedexData={ state.pokedexEntries } />
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

        <h5 style={ { marginTop: '40px' } }>Hidden</h5>
        {
            hiddenAbilities.length === 0
                ? <p>This pokemon does not have a hidden ability.</p>
                : <Abilities abilities={ hiddenAbilities } />
        }

    </Modal.Body>

    if ( Object.keys( state.trainingData ).length !== 0 ) {
        showTraining =
            <Modal.Body>
                <hr className={ `${ styles.hrTraining } ${ styles.hrMargin }` } />
                <Training data={ state.trainingData } />
            </Modal.Body>
    }

    if ( Object.keys( state.eggData ).length !== 0 ) {
        showBreeding =
            <Modal.Body>
                <hr className={ `${ styles.hrBreeding } ${ styles.hrMargin }` } />
                <Breeding eggData={ state.eggData } />
            </Modal.Body>
    }

    if ( varieties.length !== 0 ) {
        showVarieties =
            <Modal.Body>
                <hr className={ `${ styles.hrVarieties } ${ styles.hrMargin }` } />
                <Varieties varieties={ varieties } />
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
        showDamage =
            <Modal.Body>
                <hr className={ `${ styles.hrDamage } ${ styles.hrMargin }` } />
                { types.length !== 0 ? <ResistanceWeakness type={ types } key={ uuidv4() } /> : null }
            </Modal.Body>

    }


    if ( moves.length !== 0 ) {
        showMoves = <Moves moves={ moves } />
    }

    const showSelectedHandler = ( component, name ) => {
        let disabledCopy = { ...disabled };
        for ( let key in disabledCopy ) {
            if ( name === key ) {
                disabledCopy[ key ] = true;
            }
            else {
                disabledCopy[ key ] = false;
            }
        }
        setDissabled( disabledCopy )
        setShowSelected( component );
    }

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
                    <span style={ { display: 'flex', alignItems: 'baseline' } }>
                        <p className={ styles.pokeNameHeader }>{ pokeName.toUpperCase() }</p>
                        { showSpritesVersion }
                    </span>

                </Modal.Header>


                <div className={ styles.buttonContainer }>

                    <Button
                        onClick={ () => showSelectedHandler( showVarieties, name = 'varieties' ) }
                        disabled={ disabled.varieties }
                        bsPrefix={ styles.categoryButton }>
                        Varieties
                    </Button>


                    <Button
                        onClick={ () => showSelectedHandler( showForms, name = 'forms' ) }
                        disabled={ disabled.forms }
                        bsPrefix={ styles.categoryButton }>
                        Forms
                    </Button>


                    <Button
                        onClick={ () => showSelectedHandler( showStats, name = 'stats' ) }
                        disabled={ disabled.stats }
                        bsPrefix={ styles.categoryButton }>Stats</Button>


                    <Button
                        onClick={ () => showSelectedHandler( showDamage, name = 'damage' ) }
                        disabled={ disabled.damage }
                        bsPrefix={ styles.categoryButton }>Resistance & Weakness</Button>

                    <Button
                        onClick={ () => showSelectedHandler( showMoves, name = 'moves' ) }
                        disabled={ disabled.moves }
                        bsPrefix={ styles.categoryButton }>Moves</Button>
                </div>

                { showSelected }

                <span style={ { fontSize: '18px', textAlign: 'center' } }>
                    <Modal.Body>
                        <hr className={ `${ styles.hrGeneral } ${ styles.hrMargin }` } />
                        { showPokedexEntries }
                        { showTypes }

                        <span className={ styles.pokedexSizeWeight }>
                            <span style={ { borderRight: '1px solid lightgray' } }>
                                <h5>Size</h5>
                                <p>Weight: { weightInKg } kg / { pounds } lbs</p>
                                <p>Height: { meters } m / { feet } ft</p>
                            </span>

                            <span>
                                <h5>Gender</h5>
                                { showGender }
                            </span>

                        </span>
                    </Modal.Body>

                    { shoWabilities }
                    { showTraining }

                    <Modal.Body style={ { display: 'block' } }>
                        <hr className={ `${ styles.hrEvolution } ${ styles.hrMargin }` } />
                        { showEvolution }
                    </Modal.Body>

                    { showBreeding }

                    <div style={ { fontSize: '10px' } }>
                        Pokeball icons made by <a href='https://www.flaticon.com/authors/darius-dan' title='Darius Dan'>Darius Dan
                        </a> from <a href='https://www.flaticon.com/' title='Flaticon'>www.flaticon.com</a>
                    </div>
                </span>
            </Modal>
        </div>
    );


}

export default React.memo( MoreInfo );