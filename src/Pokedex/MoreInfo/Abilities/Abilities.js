import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

const Abilities = ( { abilities } ) => {
    const [ state, setState ] = useState( '' );

    const fetchAbilityData = async ( url ) => {
        try {
            let pokemon = await axios.get( url )
            let pokemonEntries = pokemon.data;

            for ( let i = 0; i < pokemonEntries.effect_entries.length; i++ ) {
                if ( pokemonEntries.effect_entries[ i ].language.name === 'en' ) {
                    setState( pokemonEntries.effect_entries[ i ] )
                }
            }

        }
        catch ( e ) {
            console.log( e );
        }


    }
    return (
        <div>


            {
                abilities.map( ability =>
                    <Button onClick={ () => fetchAbilityData( ability.url ) }
                        key={ ability.name }
                        id="PopoverFocus"
                        type="button"
                        style={ {
                            width: '51%',
                            height: '22px',
                            margin: '0',
                            padding: '0'
                        } }>{ ability.name }
                    </Button> )
            }
            { state ? <p>{ state.short_effect }</p> : <p>...</p> }


        </div>


    )
}

export default Abilities;