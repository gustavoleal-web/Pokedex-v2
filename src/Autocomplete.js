//found the Autocomplete logic online
import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const Autocomplete = ( { nationalPokedex, searchPokemon } ) => {
    const [ state, setState ] = useState( {
        activeOption: 0,
        filteredOptions: [],
        showOptions: false,
        userInput: ''
    } );

    const [ isDisbled, setIsDisabled ] = useState( true );


    //testing autocomplete suggestion
    const onChangeHandler = ( e ) => {
        let userInput = e.target.value;

        if ( userInput.length > 2 ) {
            setIsDisabled( false );

        }

        if ( userInput.length === 0 ) {
            setState( {
                activeOption: 0,
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
                activeOption: 0,
                filteredOptions: filteredSuggestions,
                showOptions: true,
                userInput: userInput
            } );
        }


    }

    const onClickHandler = ( e ) => {
        setState( {
            activeOption: 0,
            filteredOptions: [],
            showOptions: false,
            userInput: e.target.innerText
        } )
    }

    let optionList;

    if ( state.showOptions && state.userInput.length > 2 ) {

        if ( state.filteredOptions.length ) {
            optionList = (
                <ul>
                    {
                        state.filteredOptions.map( pokemon => {
                            return <li
                                key={ pokemon.entry_number }
                                onClick={ onClickHandler }>
                                { pokemon.pokemon_species.name }
                            </li>
                        } )
                    }
                </ul>
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
            <InputGroup className='mb-3'>
                <FormControl
                    placeholder='Pokemon name'
                    aria-label='Pokemon name'
                    aria-describedby='basic-addon2'
                    onChange={ onChangeHandler }
                    value={ state.userInput }
                />
                <InputGroup.Append>
                    <Button variant='outline-primary' disabled={ isDisbled } onClick={ () => searchPokemon( state.userInput ) }>Search</Button>
                </InputGroup.Append>
            </InputGroup>

            { optionList }
        </ >
    )
}

export default Autocomplete;


