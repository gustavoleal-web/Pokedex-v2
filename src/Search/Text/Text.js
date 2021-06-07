import React from 'react';
import styles from '../Search.module.css'

const Text = ( { userInputSearch, highlightedAutoComplete, onClickHandler } ) => {
    let value = `${ userInputSearch }${ highlightedAutoComplete }`
    return (
        <li onClick={ () => onClickHandler( value ) } className={ styles.listItem } >
            <p>{ userInputSearch }</p>
            <b>{ highlightedAutoComplete }</b>
        </li>
    )
}

export default Text;