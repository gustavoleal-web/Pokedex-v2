import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokedex from './Pokedex'
import styles from './App.module.css';


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
    hoenn: [ 251, 386 ],
    sinnoh: [386, 493],
    unova: [494, 649],
    kalos: [650, 721],
    alola: [721, 809],
    galar: [809, 898]
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

    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button name='kanto' onClick={ fetchSelectedPokedex }>Kanto</button>
        <button name='johto' onClick={ fetchSelectedPokedex } >Johto</button>
        <button name='hoenn' onClick={ fetchSelectedPokedex } >Hoenn</button>
        <button name='sinnoh' onClick={ fetchSelectedPokedex } >Sinnoh</button>
        <button name='unova' onClick={ fetchSelectedPokedex } >Unova</button>
        <button name='kalos' onClick={ fetchSelectedPokedex } >Kalos</button>
        <button name='alola' onClick={ fetchSelectedPokedex } >Alola</button>
        <button name='galar' onClick={ fetchSelectedPokedex } >Galar</button>
      </div>
      <div>
        { state.length !== 0
          ? newPokedex.map( pokemon => <Pokedex key={ pokemon.pokemon_species.url } id={ pokemon.entry_number } /> )
          : <p>Loading</p> }
      </div>


    </div>
  )

}
export default App;
