//import icon from '../img/icons/loupe.png'

//found the autocomplete logic online
import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './Search.module.css';
import Text from './Text/Text'

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

        if ( userInput.length > 2 && state.filteredOptions.length !== 0 ) {
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

            //removes pokemons from the list that have the userInput in the middle of their name
            //prevents rendering of pokemon that does not start with the user's input
            const onlyUserInputPokemos = filteredSuggestions.filter( pokemon => {
                return pokemon.pokemon_species.name.slice( 0, userInput.length ) === userInput.toLowerCase()
            } );

            if ( onlyUserInputPokemos.length === 0 ) {
                setIsDisabled( true );
            }

            setState( {
                filteredOptions: onlyUserInputPokemos,
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


    const buttonHandler = () => {
        searchPokemon( state.userInput );
        setState( {
            filteredOptions: [],
            showOptions: false,
            userInput: ''
        } );
    }

    const onKeyDownHandler = ( e ) => {
        if ( state.filteredOptions.length === 0 ) {
            return;
        }

        if ( e.key === 'Enter' ) {
            searchPokemon( state.userInput );
            setState( {
                filteredOptions: [],
                showOptions: false,
                userInput: ''
            } );
        }

    }

    const highlightDifferences = ( pokemonName ) => {
        let userInputSearch;
        let highlightedAutoComplete;
        let foundIndex = pokemonName.indexOf( state.userInput.toLocaleLowerCase() );

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
                <div>
                    <em className={ styles.noMatchingName }>No Pokemon Name Matches!</em>
                </div>
            );
        }
    }


    return (
        <>
            <InputGroup className='mb-3' style={ {
                margin: 'auto',
                padding: '10px',
                maxWidth: '1100px'
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
                        onClick={ buttonHandler }>
                        Search
                    </Button>
                </InputGroup.Append>
            </InputGroup>

            { optionList }
        </ >
    )
}

export default Search;


