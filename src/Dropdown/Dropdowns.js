import NavDropdown from 'react-bootstrap/NavDropdown'

const Dropdowns = ( { options, title, renderSelection } ) => {
    return <NavDropdown title={ title } id='collasible-nav-dropdown'>
        {
            options.map( element =>
                <span key={ element }>
                    <NavDropdown.Item
                        onClick={ () => renderSelection( element ) }
                    >
                        { element }

                    </NavDropdown.Item>
                </span>
            )
        }
    </NavDropdown>
}

export default Dropdowns;