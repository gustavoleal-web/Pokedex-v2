import React from 'react';
import styles from './selectPokedex.module.css'

const SelectPokedex = ({fetchSelectedPokedex}) => {
    return (
        <div className={styles.container}>
            <button name='kanto' onClick={ fetchSelectedPokedex }>Kanto</button>
            <button name='johto' onClick={ fetchSelectedPokedex } >Johto</button>
            <button name='hoenn' onClick={ fetchSelectedPokedex } >Hoenn</button>
            <button name='sinnoh' onClick={ fetchSelectedPokedex } >Sinnoh</button>
            <button name='unova' onClick={ fetchSelectedPokedex } >Unova</button>
            <button name='kalos' onClick={ fetchSelectedPokedex } >Kalos</button>
            <button name='alola' onClick={ fetchSelectedPokedex } >Alola</button>
            <button name='galar' onClick={ fetchSelectedPokedex } >Galar</button>
        </div>
    )
}

export default SelectPokedex;