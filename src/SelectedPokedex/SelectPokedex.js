import React from 'react';
import styles from './selectPokedex.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const SelectPokedex = ( { fetchSelectedPokedex } ) => {
    const allPokedexes = [ 'kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar' ];

    return (
        <DropdownButton
            id='dropdown-basic-button'
            title='Pokedex'
            variant='light'
            className={styles.searchDropDown}
           >
            {
                allPokedexes.map( pokedex =>

                    <Dropdown.Item
                        onClick={ () => fetchSelectedPokedex( pokedex ) }
                        key={ pokedex }>
                        { pokedex }
                    </Dropdown.Item>
                )
            }
        </DropdownButton>
    )
}

export default SelectPokedex;