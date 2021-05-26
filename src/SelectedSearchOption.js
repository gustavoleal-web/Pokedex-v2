import React from 'react';
import Pokedex from './Pokedex/Pokedex';
//import Autocomplete from './Autocomplete'
import Search from './Search/Search';
import styles from './SelectedSearchOption.module.css';
import { BrowserRouter } from 'react-router-dom';

const SelectedSearchOption = ( {
  selectedPokedex,
  pokedexByType,
  pokedexByColor,
  pokedexByEggGroup,
  searchPokemon,
  nationalPokedex
} ) => {

  return (
    <BrowserRouter>
      <div className={ styles.container }>

        <span style={ { marginTop: '40px' } }>
          <Search nationalPokedex={ nationalPokedex } searchPokemon={ searchPokemon } />
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

        <div className={ styles.pokemonsContainer }>
          { Object.keys( pokedexByEggGroup ).length !== 0
            ? pokedexByEggGroup.pokemon_species.map( ( pokemon, i ) =>
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
