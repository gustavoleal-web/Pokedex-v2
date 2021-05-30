//import icon from '../img/icons/loupe.png'

//found the autocomplete logic online
import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './Search.module.css';

//TODO: shrink auto suggestions to 4–8
//Highlight the Differences, Not What Users Just Typed
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
                userInput: userInput
            } );
        }


    }

    const onClickHandler = ( e ) => {
        setState( {
            filteredOptions: [],
            showOptions: false,
            userInput: e.target.innerText
        } )
    }

    const onKeyDownHandler = ( e ) => {
        if ( e.key === 'Enter' ) {
            searchPokemon( state.userInput );
        }

    }

    let optionList;

    if ( state.showOptions && state.userInput.length > 2 ) {

        if ( state.filteredOptions.length ) {
            optionList = (
                <ListGroup className={ styles.options } style={ { paddingLeft: '10px' } }>
                    {
                        state.filteredOptions.map( pokemon => {
                            return (
                                <ListGroup.Item
                                    key={ pokemon.entry_number }
                                    onClick={ onClickHandler }
                                    bsPrefix={ `${ styles.listItem }` }

                                >
                                    { pokemon.pokemon_species.name }
                                </ListGroup.Item>
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


