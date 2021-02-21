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
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

const MoreInfo = ( { name, abilities, sprites, weight, height, moves, pokeForms, stats, types, clickedPoke, backgroundColor } ) => {
    const [ modal, setModal ] = useState( false );
    const [ evolutionChainUrl, setUrl ] = useState( '' );
    const [ varieties, setVarieties ] = useState( '' );
    const [ trainingData, setTrainigData ] = useState( {} );
    const [ pekedexEntries, setPokedexEntries ] = useState( {} );
    const [ gender, setGender ] = useState( {} );
    const [ eggData, setEggData ] = useState( {} );
    const commonAbilities = [];
    const hiddenAbilities = [];

    //from reactstrap
    const toggle = () => setModal( !modal );
    const closeBtn = <button className="close" onClick={ toggle }>&times;</button>;


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
    if ( name !== 'mr-mime'
        && name !== 'mime-jr'
        && name !== 'mr-rime'
        && name !== 'nidoran-f'
        && name !== 'nidoran-m'
        && name !== 'ho-oh'
        && name !== 'porygon-z'
        && name !== 'tapu-bulu'
        && name !== 'tapu-koko'
        && name !== 'tapu-lele'
        && name !== 'tapu-fini'
        && name !== 'jangmo-o'
        && name !== 'hakamo-o'
        && name !== 'kommo-o'
        && name.includes( '-' ) ) {

        let end = name.indexOf( '-' );
        name = name.substring( 0, end );
    }

    useEffect( () => {
        const fetchData = async () => {
            try {

                let pokemon = await axios.get( `https://pokeapi.co/api/v2/pokemon-species/${ name }` );
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
        fetchData();

    }, [ name ] );


    return (
        <div>
            <Button className={ styles.moreInfo } outline color="info" onClick={ toggle } size='sm'>i</Button>
            <Modal isOpen={ modal } toggle={ toggle } animation='false'>

                <ModalHeader toggle={ toggle } close={ closeBtn } className={ backgroundColor }>
                    { pokeName.toUpperCase() }
                    {
                        sprites.versions[ 'generation-viii' ].icons.front_default
                            ? <img src={ `${ sprites.versions[ 'generation-viii' ].icons.front_default }` } alt={ { name } } />
                            : null
                    }
                </ModalHeader>

                <span style={ { fontSize: '18px', textAlign: 'center' } }>
                    <ModalBody>
                        <hr className={ `${ styles.hrGeneral } ${ styles.hrMargin }` } />
                        <div>
                            { Object.keys( pekedexEntries ).length !== 0 ? <PokedexEntries pokedexData={ pekedexEntries } /> : null }
                            <p>Weight: { weightInKg } kg</p>
                            <p>Height: { feet } ft</p>

                            <h5>Gender</h5>
                            {
                                gender === 'genderless'
                                    ? <p>Genderless</p>
                                    : <div>
                                        <p><img src={ maleIcon } alt='male' /> { gender.male }%</p>
                                        <p><img src={ femaleIcon } alt='female' /> { gender.female }%</p>
                                    </div>
                            }

                        </div>
                    </ModalBody>

                    <ModalBody >
                        <hr className={ `${ styles.hrAbilities } ${ styles.hrMargin }` } style={ { marginTop: '40px', marginBottom: '40px' } } />
                        <h5>Common</h5>
                        <Abilities abilities={ commonAbilities } />

                        <h5>Hidden</h5>
                        <Abilities abilities={ hiddenAbilities } />
                    </ModalBody>


                    <ModalBody>
                        <hr className={ `${ styles.hrTraining } ${ styles.hrMargin }` } />
                        { Object.keys( trainingData ).length !== 0 ? <Training data={ trainingData } /> : null }
                    </ModalBody>


                    <ModalBody style={ { display: 'block' } }>
                        <hr className={ `${ styles.hrEvolution } ${ styles.hrMargin }` } />
                        { <EvolutionChain clickedPoke={ clickedPoke } evolutionChainUrl={ evolutionChainUrl } /> }
                    </ModalBody>


                    <ModalBody>
                        <hr className={ `${ styles.hrBreeding } ${ styles.hrMargin }` } />
                        { Object.keys( eggData ).length !== 0 ? <Breeding eggData={ eggData } /> : null }
                    </ModalBody>

                    <ModalBody>
                        <hr className={ `${ styles.hrVarieties } ${ styles.hrMargin }` } />
                        { varieties.length === 0 ? null : <Varieties varieties={ varieties } clickedPoke={ clickedPoke } /> }
                    </ModalBody>


                    <ModalBody>
                        <hr className={ `${ styles.hrForms } ${ styles.hrMargin }` } />
                        <div className={ styles.formsContainer }>
                            { pokeForms.length !== 0 ? pokeForms.map( poke => <AlternateForms pokeForms={ poke } key={ poke.url } /> ) : null }
                            <ShinyPoke shinySprite={ sprites.front_shiny } />
                        </div>
                    </ModalBody>

                    <ModalBody>
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
                    </ModalBody>

                    <ModalBody>
                        { stats.length !== 0 ? <Stats stats={ stats } /> : null }
                    </ModalBody>

                    <ModalBody>
                        { types.map( type => <ResistanceWeakness type={type} key={uuidv4()}/> ) }
                    </ModalBody>



                </span>
            </Modal>
        </div>
    );
}

export default React.memo( MoreInfo );