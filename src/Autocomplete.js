import React, { useState } from 'react';

const Autocomplete = ( { nationalPokedex } ) => {
    const [ testSuggestion, setTestSuggestion ] = useState( [] )
    console.log( nationalPokedex )

    //testing autocomplete suggestion
    const autoCompleteTest = ( e ) => {
        console.log( e.target.value );
        if ( e.target.value.length >= 3 ) {
            const filteredSuggestions = nationalPokedex.filter( pokemon => {
                return pokemon.pokemon_species.name.indexOf( e.target.value.toLowerCase() ) > -1;
            } );

            setTestSuggestion( filteredSuggestions );
        }
        else return;

    }

    const clickAutoCompleteTest = ( e ) => {

        //console.log( e.target.innerText )
    }


    return <div>
        <input type="text" onChange={ autoCompleteTest } />

        {
            testSuggestion.length === 0
                ? null
                : testSuggestion.map( p => {
                    return <li key={ p.pokemon_species.name }
                        onClick={ clickAutoCompleteTest } >
                        { p.pokemon_species.name }
                    </li>
                } )
        }
    </div>
}

export default Autocomplete;