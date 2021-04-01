// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Navbar from 'react-bootstrap/NavBar'
// import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

const Dropdowns = ( { arr, title, func } ) => {
    return <NavDropdown title={title} id='collasible-nav-dropdown'>
    {
        arr.map( element =>
            <span key={ element }>
                <NavDropdown.Item
                    onClick={ () =>  func( element ) }
                >
                    { element }

                </NavDropdown.Item>
            </span>
        )
    }
</NavDropdown>
}

export default Dropdowns;