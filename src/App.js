import React, { useEffect, useState } from 'react';
import NotFound from './PokemonNotFound/notFound';
import styles from './app.module.css'

import axios from 'axios'

import Search from './Search/Search';
import SelectedSearchOption from './SelectedSearchOption';
import Navbar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import Dropdowns from './Dropdowns';

const App2 = () => {
    const [ nationalPokedex, setNationalPokedex ] = useState( null );
    const [ selectedPokedex, setSelectedPokedex ] = useState( null );

    const [ eggGroup, setEggGroup ] = useState( null );
    const [ pokemonEggGroup, setPokemonEggGroup ] = useState( [] );

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

    const fetchSelectedPokedex = ( pokedex ) => {
        let cutPokedex = nationalPokedex.slice( pekedexStart[ pokedex ][ 0 ], pekedexStart[ pokedex ][ 1 ] );
        setSelectedPokedex( cutPokedex );
        setNoPkmFound( null );
        setPokemonByType( [] );
        setSelectedType( null );
        setPokemonByColor( [] );
    }

    const setPokedexByTypeHandler = ( type ) => {
        setSelectedPokedex( [] );
        setPokemonByColor( [] );
        setSelectedType( type );
    }

    const setPokemonByColorHandler = ( color ) => {
        setSelectedPokedex( [] );
        setPokemonByType( [] );
        setSelectedColor( color );

    }

    const setPokemonByEggHandler = ( egg ) => {
        setSelectedPokedex( [] );
        setPokemonByType( [] );
        setPokemonByColor( [] );
        setEggGroup( egg );

    }



    const searchPokemon = ( name ) => {
        name = name.toLowerCase();

        //this will return all pokemon that match the full input or part of it.
        const foundMatches = nationalPokedex.filter( pokemon => {
            let found;
            if ( pokemon.pokemon_species.name.includes( name ) ) {
                found = pokemon;
            }
            return found;
        } );

        foundMatches.length === 0 ? setNoPkmFound( true ) : setNoPkmFound( null )

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
                    setNationalPokedex( pokemonEntries );
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
                    console.log( 'color', pokemon.data.pokemon_species )
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


    //EGG GROUPS
    useEffect( () => {
        let isMounted = true;
        const fetchData = async () => {
            if ( isMounted && eggGroup !== null ) {
                try {
                    let pokemon = await axios.get(
                        `https://pokeapi.co/api/v2/egg-group/${ eggGroup }/`,
                        { headers: { 'Access-Control-Allow-Origin': '*' } }
                    );

                    for ( let p of pokemon.data.pokemon_species ) {
                        let url = p.url;
                        let id = url.slice( 41 );
                        let intId = +id.substring( 1, id.length - 1 );

                        p.pokedexNumber = intId;
                    }

                    setPokemonEggGroup( pokemon.data );

                } catch ( e ) {
                    console.log( e );
                }
            } else return;
        };
        fetchData();
        return () => {
            isMounted = false;
        };
    }, [ eggGroup ] );


    const navigation = <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand >Pokemon Search</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">

                    <Dropdowns arr={ allPokedexes } title='Pokedex' func={ fetchSelectedPokedex } />
                    <Dropdowns arr={ types } title='Type' func={ setPokedexByTypeHandler } />
                    <Dropdowns arr={ colors } title='Color' func={ setPokemonByColorHandler } />
                    <Dropdowns arr={ eggGroups } title='Egg-Groups' func={ setPokemonByEggHandler } />
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    </div>

    let main = null;


    if ( notFound ) {
        main = <NotFound />
    }

    else if ( selectedPokedex === null ) {
        main = <div className={ styles.centerElements }>
            <div>
                <h1 className={ styles.title }>POKEDEX</h1>
            </div>

            <p className={ styles.introInfo }>Welcome to the Pokemon Search Tool.</p>
            <p className={ styles.introInfo }>Here you can search for your favorite pokemon in various ways.</p>

            <div className={ styles.center }>
                <Search searchPokemon={ searchPokemon } />
            </div>

            <div className={ styles.dropdown }>

            </div>
        </div>

    }

    else {
        main = <SelectedSearchOption
            selectedPokedex={ selectedPokedex }
            pokedexByType={ pokemonByType }
            pokedexByColor={ pokemonByColor }
            pokedexByEggGroup={ pokemonEggGroup }
            searchPokemon={ searchPokemon }

        />
    }

    return (
        <>
            { navigation }
            { main }
        </>
    )

}

export default App2;