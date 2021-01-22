import React, { useState, useEffect } from 'react';
import Abilities from './Abilities/Abilities';
import EvolutionChain from './EvolutionChain/EvolutionChain';
import AlternateForms from './AlternateForms/alternateForms';
import Varieties from './Varieties/Varieties';
import ShinyPoke from './ShinyPoke/ShinyPoke';
import styles from './moreInfo.module.css';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';




const MoreInfo = ( { name, abilities, sprites, weight, height, moves, pokeForms,  clickedPoke } ) => {
    const [ modal, setModal ] = useState( false );
    const commonAbilities = [];
    const hiddenAbilities = [];
    const [ evolutionChainUrl, setUrl ] = useState( '' );
    const [ varieties, setVarieties ] = useState( '' );

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
        && name.includes( '-' ) ) {

        let end = name.indexOf( '-' );
        name = name.substring( 0, end );
    }
    ////////////////////
    //Untitled goes HERE

    useEffect( () => {
        const fetchData = async () => {
            try {

                let pokemon = await axios.get( `https://pokeapi.co/api/v2/pokemon-species/${ name }` );
                let fetchedEvoChainURL = pokemon.data.evolution_chain.url;
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

                <ModalHeader toggle={ toggle } close={ closeBtn }>
                    { pokeName.toUpperCase() }
                    { sprites.versions[ 'generation-viii' ].icons.front_default
                        ? <img src={ `${ sprites.versions[ 'generation-viii' ].icons.front_default }` } alt={ { name } } />
                        : null
                    }

                </ModalHeader>

                <ModalBody>
                    <div>
                        <h6>Common</h6>
                        <Abilities abilities={ commonAbilities } />

                        <h6>Hidden</h6>
                        <Abilities abilities={ hiddenAbilities } />

                        <hr />
                        <div>
                            <p>Weight: { weightInKg } kg</p>
                            <p>Height: { feet } ft</p>
                        </div>

                    </div>
                </ModalBody>

                <h5>Evolution</h5>
                <ModalFooter>
                    {<EvolutionChain clickedPoke={ clickedPoke } evolutionChainUrl={ evolutionChainUrl } />}
                </ModalFooter>

                <h5>Varieties</h5>
                <ModalFooter>
                    { varieties.length === 0 ? null : <Varieties varieties={ varieties } clickedPoke={clickedPoke}/> }
                </ModalFooter>

                <h5>Forms</h5>
                <ModalFooter>
                    { pokeForms.length !== 0 ? pokeForms.map( poke => <AlternateForms pokeForms={ poke }  key={ poke.url } /> ) : null }
                    <ShinyPoke shinySprite={sprites.front_shiny}/>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default React.memo( MoreInfo );