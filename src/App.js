import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokedex from './Pokedex'



const App = () => {
  const [ state, setState ] = useState( [] )

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
    firstTen = state.slice( 0, 151 )
    console.log(firstTen)
  }


  return (

    <div>
      {console.log( 'return ran' ) }
      <h3>pokedex</h3>
      {state.length !== 0 ? firstTen.map( pokemon => <Pokedex key = { pokemon.pokemon_species.url } id={ pokemon.entry_number } /> ) : <p>Loading</p> }
    </div>
  )

}
export default App;
