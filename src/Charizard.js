import { render } from '@testing-library/react';
import React from 'react'
import charizardJSON from './charizard.json'

const Charizard = () => {

    return (
        <div>
            <h3>{charizardJSON.id} { charizardJSON.name }</h3>

            <img
                alt={ charizardJSON.name }
                src={ `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png` } />

            {charizardJSON.abilities.map( index => <p key={ index.ability.name }>{ index.ability.name }</p> ) }
        </div>
    )
}

export default Charizard;