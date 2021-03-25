import React, { useEffect, useState } from 'react';
import axios from 'axios'
import styles from './app2.module.css'
import Button from 'react-bootstrap/Button';
//import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import App from './App';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
//import DropdownItem from 'react-bootstrap/esm/DropdownItem';
//import SearchByType from './Search/SearchByType';


import Dropdowns from './Dropdowns';

const App2 = () => {
    const [ state, setState ] = useState( null );
    const [ selectedPokedex, setSelectedPokedex ] = useState( null );

    const types = [ 'fire', 'water', 'grass',
        'normal', 'electric', 'ice',
        'fighting', 'poison', 'ground',
        'flying', 'psychic', 'bug',
        'rock', 'ghost', 'dark',
        'dragon', 'steel', 'fairy' ];

    const allPokedexes = [ 'kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar' ];

    const colors = [ 'black', 'blue', 'brown', 'gray', 'green', 'pink', 'purple', 'red', 'white', 'yellow' ];

    const eggGroups = [ 'monster', 'bug', 'flying',
        'ground', 'fairy', 'plant',
        'humanshape', 'mineral', 'dragon',
        'water1', 'water2', 'water3',
        'no-eggs', 'indeterminate', 'ditto' ];

    //set the start and end of each pokedex so on click event will slice from start to finish
    const pekedexStart = {
        kanto: [ 0, 151 ],
        johto: [ 151, 250 ],
        hoenn: [ 251, 386 ],
        sinnoh: [ 386, 493 ],
        unova: [ 494, 649 ],
        kalos: [ 649, 721 ],
        alola: [ 721, 809 ],
        galar: [ 809, 898 ]
    }

    //move this function and useEffect to App2 then pass the newPokdex to App to render Pokedex Component
    const fetchSelectedPokedex = ( pokedex ) => {
        let cutPokedex = state.slice( pekedexStart[ pokedex ][ 0 ], pekedexStart[ pokedex ][ 1 ] );
        setSelectedPokedex( cutPokedex );
    }

    useEffect( () => {
        let isMounted = true;

        const fetchData = async () => {
            if ( isMounted ) {
                try {
                    let pokemon = await axios.get( ` https://pokeapi.co/api/v2/pokedex/national/ ` );
                    let pokemonEntries = pokemon.data.pokemon_entries;
                    setState( pokemonEntries );
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
    }, [] );

    const setToSelected = ( pokedex ) => {
        //setHomePage( null );
        //setSelectedPokedex( pokedex )
    }

    if ( selectedPokedex === null ) {
        return (
            <div className={ styles.centerElements }>
                <div>
                    <h1 className={ styles.title }>POKEDEX</h1>
                </div>
                <p>Welcome to the Pokemon Search Tool.</p>
                <p>Here you can search for your favorite pokemon in various ways.</p>


                <div className={ styles.center }>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder='Pokemon name'
                            aria-label='Pokemon name'
                            aria-describedby='basic-addon2'
                        />
                        <InputGroup.Append>
                            <Button variant="outline-primary" >Button</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>

                <div className={ styles.dropdown }>
                    <DropdownButton
                        id='dropdown-basic-button'
                        title='Pokedex'
                        drop='right'
                        variant='secondary'
                    >
                        {
                            allPokedexes.map( pokedex =>

                                <Dropdown.Item
                                    onClick={ () => fetchSelectedPokedex( pokedex ) }
                                    key={ pokedex }>
                                    { pokedex }

                                </Dropdown.Item>
                            )
                        }
                    </DropdownButton>

                    <Dropdowns arr={ types } title='Type' />
                    <Dropdowns arr={ colors } title='Color' />
                    <Dropdowns arr={ eggGroups } title='Egg-Groups' />
                </div>
            </div>
        )


    }

    else {
        return <App selectedPokedex={ selectedPokedex } nationalPokedex={ state } />
    }


}

export default App2;