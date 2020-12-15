import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styles from './moreInfo.module.css'

const MoreInfo = ( { name, abilities, sprites, weight, height } ) => {
    const [ modal, setModal ] = useState( false );

    const toggle = () => setModal( !modal );
    const closeBtn = <button className="close" onClick={ toggle }>&times;</button>;

    return (
        <div>
            <Button className={ styles.moreInfo } outline color="info" onClick={ toggle } size='sm'>i</Button>
            <Modal isOpen={ modal } toggle={ toggle } animation='false'>
                <ModalHeader toggle={ toggle } close={ closeBtn }>{name.toUpperCase()}</ModalHeader>
                <ModalBody>
                    <div>
                        <p>{weight}</p>
                        <p>{height}</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <p>Some more info!</p>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default MoreInfo;