import React, {useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
//import icon from '../img/icons/loupe.png'

const Search = ( {searchPokemon } ) => {
    const [ name, setName ] = useState( '' );
    const [ isDisbled, setIsDisabled ] = useState( true );

    const updateName = ( e ) => {
        e.target.value = e.target.value.trim();
        //the shortest pokemon name is 3 char and the longest is 11
        if ( e.target.value.length >= 3 && e.target.value.length < 12 ) {
            setName( e.target.value );
            setIsDisabled( false );
        }
        else {
            setIsDisabled( true );
        }

    }

    return (
        <InputGroup className='mb-3'>
            <FormControl
                placeholder='Pokemon name'
                aria-label='Pokemon name'
                aria-describedby='basic-addon2'
                onChange={ updateName }
            />
            <InputGroup.Append>
                <Button variant='outline-primary' disabled={ isDisbled } onClick={ () => searchPokemon( name ) }>Search</Button>
            </InputGroup.Append>
        </InputGroup>
    )
}

export default Search;