import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokedex from './Pokedex/Pokedex'
import SelectPokedex from './SelectedPokedex/SelectPokedex'
import Search from './Search/Search';
import styles from './App.module.css';


const App = () => {
  const [ state, setState ] = useState( [] )
  const [ newPokedex, setNewPokedex ] = useState( [] )

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

    let cutPokedex = state.slice( pekedexStart[ e.target.name ][ 0 ], pekedexStart[ e.target.name ][ 1 ] )
    setNewPokedex( cutPokedex )
  }

  useEffect( () => {

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

    <div className={ styles.container }>
      <SelectPokedex fetchSelectedPokedex={ fetchSelectedPokedex } />
      <Search />
      <div>
        { state.length !== 0
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
