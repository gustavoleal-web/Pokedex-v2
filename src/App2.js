import React, { useEffect, useState } from 'react';
import NotFound from './PokemonNotFound/notFound';
import axios from 'axios'
import styles from './app2.module.css'
import Button from 'react-bootstrap/Button';
//import ButtonGroup from 'react-bootstrap/ButtonGroup';

import App from './App';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import Navbar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
//import NavDropdown from 'react-bootstrap/NavDropdown'
//import SearchByType from './Search/SearchByType';


import Dropdowns from './Dropdowns';

const App2 = () => {
    const [ state, setState ] = useState( null );
    const [ selectedPokedex, setSelectedPokedex ] = useState( null );

    const [ name, setName ] = useState( '' );
    const [ isDisbled, setIsDisabled ] = useState( true );

    const [ selectedType, setSelectedType ] = useState( null );
    const [ pokemonByType, setPokemonByType ] = useState( [] );

    const [ selectedColor, setSelectedColor ] = useState( null );
    const [ pokemonByColor, setPokemonByColor ] = useState( [] );

    const [ notFound, setNoPkmFound ] = useState( null );

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
        // setNoPkmFound( null );
        // setPokemonByType( [] );
        // setSelectedType( null );
    }

    const setPokedexByTypeHandler = ( type ) => {
        setSelectedPokedex( [] )
        setSelectedType( type )
    }

    const setPokemonByColorHandler = ( color ) => {
        setSelectedPokedex( [] );
        setPokemonByType( [] );
        setSelectedColor( color );

    }

    const updateName = ( e ) => {
        e.target.value = e.target.value.trim();
        //the shortest pokemon name is 3 char and the longest is 11
        if ( e.target.value.length >= 3 && e.target.value.length < 12 ) {
            setName( e.target.value );
            setIsDisabled( false );
        }
        else {
            setIsDisabled( true );
        }

    }

    const searchPokemon = ( name ) => {
        name = name.toLowerCase();
        console.log( name )
        //this will return all pokemon that match the full input or part of it.
        const foundMatches = state.filter( pokemon => {
            let found;
            if ( pokemon.pokemon_species.name.includes( name ) ) {
                found = pokemon;
            }
            return found;
        } );

        foundMatches.length === 0 ? setNoPkmFound( <NotFound /> ) : setNoPkmFound( null )

        setSelectedPokedex( foundMatches );
    }

    //NATIONAL POKEDEX 
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

    //TYPES
    useEffect( () => {
        let isMounted = true;
        const fetchData = async () => {
            if ( isMounted && selectedType !== null ) {
                try {
                    let pokemon = await axios.get(
                        `https://pokeapi.co/api/v2/type/${ selectedType }`,
                        { headers: { 'Access-Control-Allow-Origin': '*' } }
                    );
                    setPokemonByType( pokemon.data.pokemon )
                    //setPokemonByType( pokemon.data.pokemon );
                } catch ( e ) {
                    console.log( e );
                }
            } else return;
        };
        fetchData();
        return () => {
            isMounted = false;
        };
    }, [ selectedType ] );

    //COLOR
    useEffect( () => {
        let isMounted = true;
        const fetchData = async () => {
            if ( isMounted && selectedColor !== null ) {
                try {
                    let pokemon = await axios.get(
                        `https://pokeapi.co/api/v2/pokemon-color/${ selectedColor }`,
                        { headers: { 'Access-Control-Allow-Origin': '*' } }
                    );

                    for ( let p of pokemon.data.pokemon_species ) {
                        let url = p.url;
                        let id = url.slice( 41 );
                        let intId = +id.substring( 1, id.length - 1 );

                        p.pokedexNumber = intId;
                    }
                    setPokemonByColor( pokemon.data );

                } catch ( e ) {
                    console.log( e );
                }
            } else return;
        };
        fetchData();
        return () => {
            isMounted = false;
        };
    }, [ selectedColor ] );


    const navigation = <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand >Pokemon Search</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Dropdowns arr={ allPokedexes } title='Pokedex' func={ fetchSelectedPokedex } />
                    <Dropdowns arr={ types } title='Type' func={ setPokedexByTypeHandler } />
                    <Dropdowns arr={ colors } title='Color' func={ setPokemonByColorHandler } />
                    <Dropdowns arr={ eggGroups } title='Egg-Groups' />
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    </div>


    if ( notFound ) {
        return (
            <>
                {navigation }
                <NotFound />
            </>
        )


    }

    else if ( selectedPokedex === null ) {
        return (
            <>
                {navigation }
                <div className={ styles.centerElements }>
                    <div>
                        <h1 className={ styles.title }>POKEDEX</h1>
                    </div>
                    <p>Welcome to the Pokemon Search Tool.</p>
                    <p>Here you can search for your favorite pokemon in various ways.</p>


                    <div className={ styles.center }>
                        <InputGroup className='mb-3'>
                            <FormControl
                                placeholder='Pokemon name'
                                aria-label='Pokemon name'
                                aria-describedby='basic-addon2'
                                onChange={ updateName }
                            />
                            <InputGroup.Append>
                                <Button variant='outline-primary' disabled={ isDisbled } onClick={ () => searchPokemon( name ) }>Search</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>

                    <div className={ styles.dropdown }>

                    </div>
                </div>


            </>
        )


    }

    else {
        return <App
            nationalPokedex={ state }
            selectedPokedex={ selectedPokedex }
            pokedexByType={ pokemonByType }
            pokedexByColor={ pokemonByColor }
        />
    }


}

export default App2;