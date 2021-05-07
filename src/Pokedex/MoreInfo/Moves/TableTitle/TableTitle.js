import React from 'react';
import styles from '../Moves.module.css';

const TableTitles = ( { firstTitle } ) => {
    let tableTitleSize;
    let title;
    if ( firstTitle === 'tutor' || firstTitle === 'egg' ) {
        tableTitleSize = styles.container2;
        title = null

    }
    else {
        tableTitleSize = styles.container;
        title = <h5 className={ styles.start }>{ firstTitle }</h5>;;
    }
    //let tableTitleSize = ( firstTitle === 'tutor' ) ? styles.container2 : styles.container;


    return <span className={ tableTitleSize }>
        { title }
        <h5 className={ styles.start }>Name</h5>
        <h5 className={ styles.center }>Type</h5>
        <h5 className={ styles.center }>Cat.</h5>
        <h5 className={ styles.end }>Power</h5>
        <h5 className={ styles.end }>Acc.</h5>
    </span>
}

export default TableTitles