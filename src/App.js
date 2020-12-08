import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokedex from './Pokedex/Pokedex'
import SelectPokedex from './SelectedPokedex/SelectPokedex'
import Search from './Search/Search';
import styles from './App.module.css';
//object[i].pokemon_species.name

//TODO: might no even need to use clicked ans setClicked
//TODO instead check to see if the string is empty. If it is don't do anthing. 
//TODO: option 2: disable the button until user enters a valid pokemon name. 

const App = () => {
  const [ state, setState ] = useState( [] );
  const [ newPokedex, setNewPokedex ] = useState( [] );
  const [ clicked, setClicked ] = useState( false );
  const [ pokemonName, setPokemonName ] = useState( '' );



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

  const fetchSelectedPokedex = ( e = 'kanto' ) => {
    setClicked( false );
    let cutPokedex = state.slice( pekedexStart[ e.target.name ][ 0 ], pekedexStart[ e.target.name ][ 1 ] );
    setNewPokedex( cutPokedex );
  }

  useEffect( () => {

    const fetchData = async () => {
      try {
        let pokemon = await axios.get( ` https://pokeapi.co/api/v2/pokedex/national ` );
        let pokemonEntries = pokemon.data.pokemon_entries;
        setState( pokemonEntries );
        setNewPokedex( pokemonEntries.slice( 0, 151 ) );
      }
      catch ( e ) {
        console.log( e );
      }
    }
    fetchData()
  }, [] )



  const wasClicked = ( name ) => {
    if ( name.length === 0 ) {
      setClicked( false );
      return;
    }
    else if ( name.length >= 3 && name.length < 12 ) {
      name = name.toLowerCase().trim();

      for ( let i = 0; i < state.length; i++ ) {
        if ( state[ i ].pokemon_species.name.includes( name ) ) {
          console.log( state[ i ].pokemon_species.name );
          setPokemonName( state[ i ].pokemon_species.name );
          break;
        }
      }
      setClicked( true );
    }

//this will return all pokemon that match the input value
//this will be better to use than the loop above
    const foundMatches = state.filter( pokemon => {
      let found;
      if ( pokemon.pokemon_species.name.includes( name ) ) {
        found = pokemon;
      }
      return found;
    } )

  }

  return (

    <div className={ styles.container }>
      <SelectPokedex fetchSelectedPokedex={ fetchSelectedPokedex } />

      <Search clicked={ clicked } wasClicked={ wasClicked } />

      <div>

        { clicked === true ? <Pokedex id={ pokemonName } />

          : state.length !== 0
            ? newPokedex.map( pokemon =>
              <Pokedex
                key={ pokemon.pokemon_species.url }
                id={ pokemon.entry_number }
              /> )
            : <p>Loading</p> }

      </div>
    </div>
  )

}
export default App;
