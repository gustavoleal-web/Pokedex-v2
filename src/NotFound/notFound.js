import React from 'react';
import Search from '../Search/Search'
import styles from './notFound.module.css'


const notFound = ( { nationalPokedex, searchPokemon } ) => {
    return (
        <>
            <div className={ styles.search }>
                <Search nationalPokedex={ nationalPokedex } searchPokemon={ searchPokemon } />
            </div>

            <div className={ styles.container }>
                <h1 className={ styles.containerText }> 404</h1>
                <h4 className={ styles.containerText2 }>Oops! Page not found.</h4>
                <h6 className={ styles.containerText3 }>Something whent wrong. Try again later.</h6>
            </div>

        </>
    )

}

export default notFound;