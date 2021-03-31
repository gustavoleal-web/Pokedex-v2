import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const Dropdowns = ( { arr, title } ) => {
    return <DropdownButton
        id='dropdown-basic-button'
        title={ title }
        drop='right'
        variant='secondary'
    >
        {
            arr.map( element =>

                <Dropdown.Item
                    key={ element }>
                    { element }

                </Dropdown.Item>
            )
        }
    </DropdownButton>
}

export default Dropdowns;