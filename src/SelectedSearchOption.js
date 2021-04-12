import React, { useState, useEffect } from 'react';
//import SearchBytypes from './Search/SearchByType'
//import axios from 'axios';
import Pokedex from './Pokedex/Pokedex';
import Search from './Search';
//import SelectPokedex from './SelectedPokedex/SelectPokedex'
//import Search from './Search/Search';
//import NotFound from './PokemonNotFound/notFound'
import styles from './SelectedSearchOption.module.css';
import { BrowserRouter } from 'react-router-dom';



const SelectedSearchOption = ( { selectedPokedex, pokedexByType, pokedexByColor, searchPokemon } ) => {
  
  return (
    <BrowserRouter>
      <div className={ styles.container }>

        <span style={ { marginTop: '40px' } }>
          <Search searchPokemon={ searchPokemon } />
        </span>


        <div className={ styles.pokemonsContainer }>
          { selectedPokedex.length !== 0
            ? selectedPokedex.map( pokemon =>
              <Pokedex
                key={ pokemon.pokemon_species.url }
                id={ pokemon.entry_number }


              /> )
            : null
          }

        </div>

        <div className={ styles.pokemonsContainer }>
          { pokedexByType.length !== 0
            ? pokedexByType.map( pokemon =>
              <Pokedex
                key={ pokemon.pokemon.name }
                id={ pokemon.pokemon.name }


              /> )
            : null
          }

        </div>



        <div className={ styles.pokemonsContainer }>
          { pokedexByColor.length !== 0
            ? pokedexByColor.pokemon_species.map( ( pokemon, i ) =>
              <Pokedex
                key={ i }
                id={ pokemon.pokedexNumber }


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

export default SelectedSearchOption;
