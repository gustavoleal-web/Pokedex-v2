import React, { useState } from 'react';
import Abilities from './Abilities/Abilities'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styles from './moreInfo.module.css'

const MoreInfo = ( { name, abilities, sprites, weight, height } ) => {
    const [ modal, setModal ] = useState( false );
    const commonAbilities = [];
    const hiddenAbilities = [];
    console.log(abilities)

    //from reactstrap
    const toggle = () => setModal( !modal );
    const closeBtn = <button className="close" onClick={ toggle }>&times;</button>;

    //convert the value to meeters then to ft
    let feet = ( height / 10 ) * 3.281;
    feet = feet.toFixed( 2 )

    let wightInKg = weight / 10;

    for ( let i = 0; i < abilities.length; i++ ) {
        if ( abilities[ i ].is_hidden ) {
            hiddenAbilities.push( abilities[ i ].ability.name )
        }
        else {
            commonAbilities.push( abilities[ i ].ability.name )
        }
    }

    return (
        <div>
            <Button className={ styles.moreInfo } outline color="info" onClick={ toggle } size='sm'>i</Button>
            <Modal isOpen={ modal } toggle={ toggle } animation='false'>
                <ModalHeader toggle={ toggle } close={ closeBtn }>{ name.toUpperCase() }</ModalHeader>
                <ModalBody>
                    <div>
                        <h6>Common</h6>
                        <Abilities abilities={ commonAbilities } />

                        <h6>Hidden</h6>
                        <Abilities abilities={ hiddenAbilities } />

                        <hr />
                        <div>
                            <p>Weight: { wightInKg } kg</p>
                            <p>Height: { feet } ft</p>
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <img src={ `${ sprites.versions[ 'generation-viii' ].icons.front_default }` } alt="" />
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default MoreInfo;