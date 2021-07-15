import React from 'react';
import Pokedex from '../Pokedex/Pokedex';
import styles from './SelectedDropdownOption.module.css';
import { BrowserRouter } from 'react-router-dom';

const SelectedSearchOption = ( {
  selectedPokedex,
  pokedexByType,
  pokedexByColor,
  pokedexByEggGroup,

} ) => {
  let style = styles.smallPokemonsContainer;
  
  if ( selectedPokedex.length > 10 ) {
    style = styles.pokemonsContainer;
  }

  return (

    <div className={ styles.container }>

      { selectedPokedex.length !== 0
        ? <div className={ style } >

          { selectedPokedex.map( pokemon =>
            <Pokedex
              key={ pokemon.pokemon_species.url }
              id={ pokemon.entry_number }
            /> )
          }

        </div>

        : null
      }


      { pokedexByType.length !== 0
        ? <div className={ styles.pokemonsContainer }>

          { pokedexByType.map( pokemon =>
            <Pokedex
              key={ pokemon.pokemon.name }
              id={ pokemon.pokemon.name }

            /> )
          }

        </div>

        : null
      }


      { pokedexByColor.length !== 0
        ? <div className={ styles.pokemonsContainer }>

          { pokedexByColor.pokemon_species.map( ( pokemon, i ) =>
            <Pokedex
              key={ i }
              id={ pokemon.pokedexNumber }

            /> )
          }

        </div>

        : null
      }


      { Object.keys( pokedexByEggGroup ).length !== 0

        ? <div className={ styles.pokemonsContainer }>

          { pokedexByEggGroup.pokemon_species.map( ( pokemon, i ) =>
            <Pokedex
              key={ i }
              id={ pokemon.pokedexNumber }

            /> )
          }

        </div>

        : null
      }

      <div>
        Icons made by <a href='https://www.flaticon.com/authors/darius-dan' title='Darius Dan'>Darius Dan
        </a> from <a href='https://www.flaticon.com/' title='Flaticon'>www.flaticon.com</a>
      </div>

    </div>
  )

}

export default SelectedSearchOption;
