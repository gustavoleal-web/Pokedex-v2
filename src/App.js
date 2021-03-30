import React, { useState, useEffect } from 'react';
import SearchBytypes from './Search/SearchByType'
import axios from 'axios';
import Pokedex from './Pokedex/Pokedex'
import SelectPokedex from './SelectedPokedex/SelectPokedex'
import Search from './Search/Search';
import NotFound from './PokemonNotFound/notFound'
import styles from './App.module.css';
import { BrowserRouter } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const App = ( { selectedPokedex, nationalPokedex } ) => {
  const [ state, setState ] = useState( [] );
  const [ newPokedex, setNewPokedex ] = useState( selectedPokedex );
  const [ noPkmFound, setNoPkmFound ] = useState( null );
  const [ selectedType, setSelectedType ] = useState( null );
  const [ pokemonByType, setPokemonByType ] = useState( [] );

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
    //console.log(state)
    //let cutPokedex = state.slice( pekedexStart[ pokedex ][ 0 ], pekedexStart[ pokedex ][ 1 ] );
    //setNewPokedex( cutPokedex );
    setNoPkmFound( null );
    setPokemonByType( [] );
    setSelectedType( null );
  }

  const setPokedexByTypeHandler = ( type ) => {
    setNewPokedex( [] )
    setSelectedType( type ) 
  }

  // useEffect( () => {
  //   let isMounted = true;

  //   const fetchData = async () => {
  //     if ( isMounted ) {
  //       try {
  //         let pokemon = await axios.get( ` https://pokeapi.co/api/v2/pokedex/national/ ` );
  //         let pokemonEntries = pokemon.data.pokemon_entries;
  //         setState( pokemonEntries );
  //         fetchSelectedPokedex(selectedPokedex)
  //         //setNewPokedex( pokemonEntries.slice( 0, 151 ) );
  //       }
  //       catch ( e ) {
  //         console.log( e );
  //       }
  //     }

  //   }
  //   fetchData();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [] );


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
          setPokemonByType( pokemon.data.pokemon );
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



  const wasClicked = ( name ) => {
    name = name.toLowerCase();
    console.log(name)
    //this will return all pokemon that match the full input or part of it.
    const foundMatches = nationalPokedex.filter( pokemon => {
      let found;
      if ( pokemon.pokemon_species.name.includes( name ) ) {
        found = pokemon;
      }
      return found;
    } );

    foundMatches.length === 0 ? setNoPkmFound( <NotFound /> ) : setNoPkmFound( null )

    setNewPokedex( foundMatches );
  }

  return (
    <BrowserRouter>
      <div className={ styles.container }>

        <Search wasClicked={ wasClicked } />

        <header style={ { display: 'flex' } }>
          <SelectPokedex fetchSelectedPokedex={ fetchSelectedPokedex } />
          <SearchBytypes setPokedexByTypeHandler={ setPokedexByTypeHandler } />



          <DropdownButton id="dropdown-basic-button" title="Filter">
            <Dropdown.Item href="#/action-1">Color</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Egg Group</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>

        </header>




        { noPkmFound }

        <div className={ styles.pokemonsContainer }>
          { newPokedex.length !== 0
            ? newPokedex.map( pokemon =>
              <Pokedex
                key={ pokemon.pokemon_species.url }
                id={ pokemon.entry_number }
                clickedPoke={ wasClicked }

              /> )
            : null
          }

        </div>

        <div className={ styles.pokemonsContainer }>
          { pokemonByType.length !== 0
            ? pokemonByType.map( pokemon =>
              <Pokedex
                key={ pokemon.pokemon.name }
                id={ pokemon.pokemon.name }
                clickedPoke={ wasClicked }

              /> )
            : null
          }

        </div>

        <div>
          Icons made by <a href='https://www.freepik.com' title='Freepik'>Freepik
        </a> from <a href='https://www.flaticon.com/' title='Flaticon'>www.flaticon.com</a>
        </div>
        <div>
          Icons made by <a href="https://www.flaticon.com/authors/iconixar" title="iconixar">iconixar
        </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        </div>
      </div>
    </BrowserRouter>
  )

}

export default App;
