//found the Autocomplete logic online
import React, { useState } from 'react';

const Autocomplete = ( { nationalPokedex } ) => {
    const [ state, setState ] = useState( {
        activeOption: 0,
        filteredOptions: [],
        showOptions: false,
        userInput: ''
    } )


    //testing autocomplete suggestion
    const onChangeHandler = ( e ) => {
        let userInput = e.target.value;

        if ( userInput.length === 0 ) {
            setState( {
                activeOption: 0,
                filteredOptions: [],
                showOptions: true,
                userInput: ''
            } );
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


    return <div>
        <input
            type='text'
            onChange={ onChangeHandler }
            value={ state.userInput }
        />
        <button>Search</button>

        { optionList }
    </div >
}

export default Autocomplete;


