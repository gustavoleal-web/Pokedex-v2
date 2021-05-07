import React from 'react';
import styles from '../Moves.module.css';

const TableTitles = ( { firstTitle } ) => {
    let tableTitleSize;
    let title;

    //these tables are shortes so the appropriate container class will accommodate for it
    //there is no need for a title like 'Lv.' or 'TM' in these table title
    //so null is assigned
    if ( firstTitle === 'tutor' || firstTitle === 'egg' ) {
        tableTitleSize = styles.container2;
        title = null

    }
    else {
        tableTitleSize = styles.container;
        title = <h5 className={ styles.start }>{ firstTitle }</h5>;;
    }

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