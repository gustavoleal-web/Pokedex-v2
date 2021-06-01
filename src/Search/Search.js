//import icon from '../img/icons/loupe.png'

//found the autocomplete logic online
import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './Search.module.css';


import Text from './Text'
//TODO: shrink auto suggestions to 4–8
// //Highlight the Differences, Not What Users Just Typed
//avoid scrollbars / optimized to fit within the viewport
//try dimming the page when the scroll bar is active
//provide visual hints that the list is scrollable

const Search = ( { nationalPokedex, searchPokemon } ) => {
    const [ state, setState ] = useState( {
        filteredOptions: [],
        showOptions: false,
        userInput: ''
    } );


    const varStyles = {
        backgroundColor: 'black',
        color: 'white',
        fontWeight: '700'
    }

    const [ isDisbled, setIsDisabled ] = useState( true );

    const onChangeHandler = ( e ) => {
        let userInput = e.target.value;

        if ( userInput.length > 2 ) {
            setIsDisabled( false );

        }

        if ( userInput.length === 0 ) {
            setState( {
                filteredOptions: [],
                showOptions: true,
                userInput: ''
            } );

            setIsDisabled( true );
        }



        else {
            const filteredSuggestions = nationalPokedex.filter( pokemon => {
                return pokemon.pokemon_species.name.indexOf( userInput.toLowerCase() ) > -1;
            } );

            setState( {
                filteredOptions: filteredSuggestions,
                showOptions: true,
                userInput: userInput,
            } );
        }


    }

    const onClickHandler = ( value ) => {
        setState( {
            filteredOptions: [],
            showOptions: false,
            userInput: value
        } )
    }


    const onKeyDownHandler = ( e ) => {
        if ( e.key === 'Enter' ) {
            searchPokemon( state.userInput );
        }

    }

    const highlightDifferences = ( pokemonName ) => {
        let userInputSearch;
        let highlightedAutoComplete;
        let foundIndex = pokemonName.indexOf( state.userInput );

        //1. the string is found in the beginning
        //highlight everything after: the index after the last char of the substring. to the last index of the full string

        if ( foundIndex === 0 ) {
            userInputSearch = pokemonName.substring( foundIndex, state.userInput.length );
            highlightedAutoComplete = pokemonName.substring( state.userInput.length, pokemonName.length );
            return (
                <Text
                    userInputSearch={ userInputSearch }
                    highlightedAutoComplete={ highlightedAutoComplete }
                    onClickHandler={ onClickHandler }
                />
            );
        }

        else return null
    }

    let optionList;

    if ( state.showOptions && state.userInput.length > 2 ) {

        if ( state.filteredOptions.length ) {
            optionList = (
                <ListGroup className={ styles.options } style={ { paddingLeft: '10px' } }>
                    {
                        state.filteredOptions.map( pokemon => {
                            let text = highlightDifferences( pokemon.pokemon_species.name );
                            return (
                                <span key={ pokemon.pokemon_species.name }>
                                    { text }
                                </span>
                            )
                        } )
                    }
                </ListGroup>
            );
        } else {

            optionList = (
                <div >
                    <em>No Option!</em>
                </div>
            );
        }
    }


    return (
        <>
            <InputGroup className='mb-3' style={ {
                margin: 'auto',
                padding: '10px'
            } }>
                <FormControl
                    placeholder='Pokemon name'
                    aria-label='Pokemon name'
                    aria-describedby='basic-addon2'
                    onChange={ onChangeHandler }
                    onKeyDown={ onKeyDownHandler }
                    value={ state.userInput }

                />
                <InputGroup.Append>
                    <Button
                        style={ varStyles }
                        disabled={ isDisbled }
                        onClick={ () => searchPokemon( state.userInput ) }>
                        Search
                    </Button>
                </InputGroup.Append>
            </InputGroup>

            { optionList }
        </ >
    )
}

export default Search;


