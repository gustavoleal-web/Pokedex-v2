import React, { useEffect, useState, useRef } from 'react';
import NotFound from './NotFound/notFound';
import styles from './app.module.css'
import axios from 'axios'
import Search from './Search/Search';
import SelectedDropdownOption from './SelectedDropdownOption/SelectedDropdownOption';
import Navbar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import Dropdowns from './Dropdown/Dropdowns';
import icon from '../src/img/icons/snorlax.png';

const App = () => {
    const isMounted = useRef( false );
    const [ nationalPokedex, setNationalPokedex ] = useState( null );
    const [ selectedPokedex, setSelectedPokedex ] = useState( null );

    const [ eggGroup, setEggGroup ] = useState( null );
    const [ pokemonEggGroup, setPokemonEggGroup ] = useState( [] );

    const [ selectedType, setSelectedType ] = useState( null );
    const [ pokemonByType, setPokemonByType ] = useState( [] );

    const [ selectedColor, setSelectedColor ] = useState( null );
    const [ pokemonByColor, setPokemonByColor ] = useState( [] );

    const [ notFound, setNotFound ] = useState( false );

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
        setNotFound( false );
        setSelectedType( null );
        setPokemonByType( [] );
        setPokemonByColor( [] );
        setPokemonEggGroup( [] );
    }

    const setPokedexByTypeHandler = ( type ) => {
        setNotFound( false );
        setSelectedPokedex( [] );
        setPokemonByColor( [] );
        setPokemonEggGroup( [] );
        setSelectedType( type );
    }

    const setPokemonByColorHandler = ( color ) => {
        setNotFound( false );
        setSelectedPokedex( [] );
        setPokemonByType( [] );
        setPokemonEggGroup( [] );
        setSelectedColor( color );

    }

    const setPokemonByEggHandler = ( egg ) => {
        setNotFound( false );
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

        foundMatches.length === 0 ? setNotFound( true ) : setNotFound( false );

        setSelectedPokedex( foundMatches );
        setPokemonByType( [] );
        setPokemonByColor( [] );
        setPokemonEggGroup( [] );
    }

    //NATIONAL POKEDEX 
    useEffect( () => {
        isMounted.current = true;

        const fetchData = async () => {
            if ( isMounted.current ) {
                try {
                    let pokemon = await axios.get( ` https://pokeapi.co/api/v2/pokedex/national/ ` );
                    let pokemonEntries = pokemon.data.pokemon_entries;
                    setNationalPokedex( pokemonEntries );
                }
                catch ( e ) {
                    setNotFound( true );
                }
            }

        }
        fetchData();
        return () => {
            isMounted.current = false;
        };
    }, [] );

    //TYPES
    useEffect( () => {
        isMounted.current = true;
        const fetchData = async () => {
            if ( isMounted.current && selectedType !== null ) {
                try {
                    let pokemon = await axios.get( `https://pokeapi.co/api/v2/type/${ selectedType }` );
                    setPokemonByType( pokemon.data.pokemon );
                }
                catch ( e ) {
                    setNotFound( true );
                }
            } else return;
        };
        fetchData();
        return () => {
            isMounted.current = false;
        };
    }, [ selectedType ] );

    //COLOR
    useEffect( () => {
        isMounted.current = true;
        const fetchData = async () => {
            if ( isMounted.current && selectedColor !== null ) {
                try {
                    let pokemon = await axios.get(
                        `https://pokeapi.co/api/v2/pokemon-color/${ selectedColor }` );

                    for ( let p of pokemon.data.pokemon_species ) {
                        let url = p.url;
                        let id = url.slice( 41 );
                        let intId = +id.substring( 1, id.length - 1 );

                        p.pokedexNumber = intId;
                    }
                    setPokemonByColor( pokemon.data );

                } catch ( e ) {
                    setNotFound( true );
                }
            } else return;
        };
        fetchData();
        return () => {
            isMounted.current = false;
        };
    }, [ selectedColor ] );


    //EGG GROUPS
    useEffect( () => {
        isMounted.current = true;
        const fetchData = async () => {
            if ( isMounted.current && eggGroup !== null ) {
                try {

                    let pokemon = await axios.get(
                        `https://pokeapi.co/api/v2/egg-group/${ eggGroup }/` );

                    for ( let p of pokemon.data.pokemon_species ) {
                        let url = p.url;
                        let id = url.slice( 41 );
                        let intId = +id.substring( 1, id.length - 1 );

                        p.pokedexNumber = intId;
                    }

                    setPokemonEggGroup( pokemon.data );

                } catch ( e ) {
                    setNotFound( true );
                }
            } else return;
        };
        fetchData();
        return () => {
            isMounted.current = false;
        };
    }, [ eggGroup ] );


    const navigation = <div>
        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
            <Navbar.Brand ><img src={ icon } alt="" /> Pokemon Search</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'>
                    <Dropdowns options={ allPokedexes } title='Pokedex' renderSelection={ fetchSelectedPokedex } />
                    <Dropdowns options={ types } title='Type' renderSelection={ setPokedexByTypeHandler } />
                    <Dropdowns options={ colors } title='Color' renderSelection={ setPokemonByColorHandler } />
                    <Dropdowns options={ eggGroups } title='Egg-Groups' renderSelection={ setPokemonByEggHandler } />
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    </div>

    let main = null;

    if ( notFound ) {
        main = <NotFound nationalPokedex={ nationalPokedex } searchPokemon={ searchPokemon } />
    }

    else if ( selectedPokedex === null ) {
        main = <div>
            <div className={ styles.titleContainer }>
                <h1 className={ styles.title }>POKEDEX</h1>
            </div>

            <div className={ styles.center }>
                <p className={ styles.introInfo }>Welcome to the Pokemon Search Tool.</p>
                <p className={ styles.introInfo }>Here you can search for your favorite pokemon in various ways.</p>

                {
                    nationalPokedex === null ? null : <Search nationalPokedex={ nationalPokedex } searchPokemon={ searchPokemon } />
                }
            </div>

            <div style={ { fontSize: '10px', textAlign: 'center' } }>Icons made by
                <a href="https://www.flaticon.com/authors/roundicons-freebies" title="Roundicons Freebies">
                    Roundicons Freebies</a> from
                <a href="https://www.flaticon.com/" title="Flaticon">
                    www.flaticon.com</a>
            </div>

        </div>

    }

    else {
        main = <>
            <div className={ styles.inputContainer }>
                <Search nationalPokedex={ nationalPokedex } searchPokemon={ searchPokemon } />
            </div>
            <SelectedDropdownOption
                selectedPokedex={ selectedPokedex }
                pokedexByType={ pokemonByType }
                pokedexByColor={ pokemonByColor }
                pokedexByEggGroup={ pokemonEggGroup }
                searchPokemon={ searchPokemon }
                nationalPokedex={ nationalPokedex }

            />
        </>
    }

    return (
        <div className={ styles.masterContainer }>
            { navigation }
            <div className={ styles.fullBackground }>
                { main }
            </div>
        </div>
    )

}

export default App;