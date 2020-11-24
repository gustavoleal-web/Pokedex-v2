import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokedex from './Pokedex'



const App = () => {
  const [ state, setState ] = useState( [] )
  //this might be redundant: i can probably just use to variables instead of useState
  const [ pokedexLength, setPokedexLength ] = useState( 151 )  //remeber to change back to 151 for the original pokedex
  let start = pokedexLength;


  useEffect( () => {
    console.log( 'useEffect Ran' )
    const fetchData = async () => {
      try {
        let pokemon = await axios.get( ` https://pokeapi.co/api/v2/pokedex/national ` )
        let pokemonEntries = pokemon.data.pokemon_entries;
        setState( pokemonEntries )
      }
      catch ( e ) {
        console.log( e );
      }
    }
    fetchData()
  }, [] )

  let firstTen;
  if ( state.length !== 0 ) {
    firstTen = state.slice( 0, pokedexLength )
  }


  const fetchSelectedPokedex = ( e ) => {
    if ( e.target.name === 'kanto' ) {
      start = 0;
    }
    let cutPokedex = state.slice( start, e.target.value )
    setState( cutPokedex )
  }

  return (

    <div>
      <div>
        <button name='kanto' value={ 151 } onClick={ fetchSelectedPokedex }>Kanto</button>
        <button value={ 251 } onClick={ fetchSelectedPokedex } >Johto</button>
      </div>


      {state.length !== 0 ? firstTen.map( pokemon => <Pokedex key={ pokemon.pokemon_species.url } id={ pokemon.entry_number } /> ) : <p>Loading</p> }
    </div>
  )

}
export default App;
