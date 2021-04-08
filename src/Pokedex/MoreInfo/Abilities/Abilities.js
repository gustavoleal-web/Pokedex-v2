import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

const Abilities = ( { abilities } ) => {
    const [ state, setState ] = useState( {
        effect: ''
    } );
    const cssStyles = {
        width: '51%',
        height: '27px',
        margin: '0',
        padding: '0',
    }

    const fetchAbilityData = async ( url ) => {
        try {
            let pokemon = await axios.get( url )
            let pokemonEntries = pokemon.data;

            //some pokemon have their hidden effect under a different object name
            //this is how the API has it set.
            //so the check is performed to set the state appropriately
            if ( pokemonEntries.effect_entries.length === 0 ) {
                setState( { ...state, effect: pokemonEntries.flavor_text_entries[ 0 ].flavor_text } );
            }

            else {
                for ( let i = 0; i < pokemonEntries.effect_entries.length; i++ ) {
                    if ( pokemonEntries.effect_entries[ i ].language.name === 'en' ) {
                        setState( { ...state, effect: pokemonEntries.effect_entries[ i ].short_effect } )
                    }
                }
            }

        }
        catch ( e ) {
            console.log( e );
        }


    }
    return (
        <>
            {
                abilities.map( ability =>
                    <Button onClick={ () => fetchAbilityData( ability.url ) }
                        key={ ability.name }
                        id="PopoverFocus"
                        type="button"
                        style={ cssStyles }>{ ability.name }
                    </Button> )
            }
            { state ? <p>{ state.effect }</p> : null }
        </>


    )
}

export default Abilities;