import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const MoreInfo = () => {
    const [ modal, setModal ] = useState( false );

    const toggle = () => setModal( !modal );

    const closeBtn = <button className="close" onClick={ toggle }>&times;</button>;

    return (
        <div>
            <Button color="info" onClick={ toggle }>Info</Button>
            <Modal isOpen={ modal } toggle={ toggle } >
                <ModalHeader toggle={ toggle } close={ closeBtn }>Modal title</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est laborum.
        </ModalBody>
                <ModalFooter>
                  <p>Some more info!</p>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default MoreInfo;