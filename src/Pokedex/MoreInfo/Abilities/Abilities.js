import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';

const Abilities = ( { abilities } ) => {
    const [ state, setState ] = useState( '' );

    useEffect( () => {
        const fetchData = async () => {
            try {
                let pokemon = await axios.get( `https://pokeapi.co/api/v2/ability/${ abilities[ 0 ] }/` )
                let pokemonEntries = pokemon.data;
                setState( pokemonEntries )

            }
            catch ( e ) {
                console.log( e );
            }
        }
        fetchData();

    }, [] );
    //state is an object so it doesnt have length---DUH
    return (
        <div>
            {console.log( state ) }
            <span style={ { display: 'flex' } } >
                {
                    abilities.map( ability => <Button key={ ability } id="PopoverFocus" type="button" style={ {
                        width: '51%',
                        height: '22px',
                        margin: '0',
                        padding: '0'
                    } }>{ ability }</Button> )
                }
            </span>
            {Object.keys( state ).length !== 0
                ? <UncontrolledPopover trigger="focus" placement="bottom" target="PopoverFocus">
                    <PopoverHeader>Focus Trigger</PopoverHeader>
                    <PopoverBody>{ state.effect_entries[ 1 ].short_effect }</PopoverBody>
                </UncontrolledPopover>
                : null
            }

        </div>


    )
}

export default React.memo( Abilities );