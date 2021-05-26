import React from 'react';
//import Autocomplete from '../Autocomplete';
import Search from '../Search/Search'
import notFoundImg from '../img/surprised_pikachu.jpg'
import styles from './notFound.module.css'


const notFound = ( { nationalPokedex, searchPokemon } ) => {
    return (
        <>
            <div className={ styles.search }>
                <Search nationalPokedex={ nationalPokedex } searchPokemon={ searchPokemon } />
            </div>


            <div className={ styles.container }>
                <img src={ notFoundImg } alt='No pokemon found.' className={ styles.border } />
                <div>
                    <h1> Oops!</h1>
                    <h3>NO POKEMON FOUND</h3>
                </div>

            </div>

        </>
    )

}

export default notFound;