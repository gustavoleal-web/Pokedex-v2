import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokedex from './Pokedex'

//Pokedex
//kanto 1 -151
//johto 151 - 251
// hoeen 252 - 386


const App = () => {
  const [ state, setState ] = useState( [] )
  const [ newPokedex, setNewPokedex ] = useState( [] )

  //set the start and end of each pokedex so on click event will slice from start to finish
  const pekedexStart = {
    kanto: [ 0, 151 ],
    johto: [ 152, 250 ],
    hoenn: [ 251, 386 ]
  }

  const fetchSelectedPokedex = ( e = 'kanto' ) => {
    
    let cutPokedex = state.slice( pekedexStart[ e.target.name ][ 0 ], pekedexStart[ e.target.name ][ 1 ] )
    setNewPokedex( cutPokedex )
  }

  useEffect( () => {
    console.log( 'useEffect Ran' )
    const fetchData = async () => {
      try {
        let pokemon = await axios.get( ` https://pokeapi.co/api/v2/pokedex/national ` )
        let pokemonEntries = pokemon.data.pokemon_entries;
        setState( pokemonEntries )
        setNewPokedex( pokemonEntries.slice( 0, 151 ) )
      }
      catch ( e ) {
        console.log( e );
      }
    }
    fetchData()
  }, [] )

  return (

    <div>
      <div>
        <button name='kanto' onClick={ fetchSelectedPokedex }>Kanto</button>
        <button name='johto' onClick={ fetchSelectedPokedex } >Johto</button>
        <button name='hoenn' onClick={ fetchSelectedPokedex } >Hoenn</button>
      </div>


      {state.length !== 0 ? newPokedex.map( pokemon => <Pokedex key={ pokemon.pokemon_species.url } id={ pokemon.entry_number } /> ) : <p>Loading</p> }
    </div>
  )

}
export default App;
