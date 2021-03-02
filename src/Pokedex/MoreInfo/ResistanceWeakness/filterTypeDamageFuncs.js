
//if a halfDamage type in index 0 is present in doubleDamage in index 1 that type cancels out and the pokemon is not affected
//vise versa for doubleDamege in 0 and halfDamage in 1

const getAllWeakness = ( doubleDamage, halfDamage ) => {
    let damage = {
        normal: [],
        weakness: []
    }
    let double = [];
    let half = [];

    for ( let i = 0; i < doubleDamage.length; i++ ) {
        double.push( doubleDamage[ i ].name );
    }
    for ( let i = 0; i < halfDamage.length; i++ ) {
        half.push( halfDamage[ i ].name )
    }

    let noDoublesWeakness = []
    double.forEach( type => {
        if ( half.includes( type ) ) {
            damage.normal.push( type )
        }
        else {
            noDoublesWeakness.push( type )
        }
    } );

    damage.weakness = [ ...noDoublesWeakness ];
    return damage;
}

const removeDuplicateType = ( typeToRemove, arrToRemoveFrom ) => {
    typeToRemove.forEach( type => {
        if ( arrToRemoveFrom.includes( type.name ) && type.name !== undefined ) {
            arrToRemoveFrom.splice( arrToRemoveFrom.indexOf( type.name ), 1 )
        }
        else if ( arrToRemoveFrom.includes( type ) ) {
            arrToRemoveFrom.splice( arrToRemoveFrom.indexOf( type ), 1 )
        }
        return true;
    } );

    return true;
}


const oneFourthAndHalfDamage = ( typeOne, typeTwo ) => {
    let fractionalDamage = {
        fourth: [],
        half: []
    }

    let arr1 = [];
    let arr2 = [];
    for ( let value of typeOne ) {
        arr1.push( value.name )
    }
    for ( let value of typeTwo ) {
        arr2.push( value.name )
    }

    let oneFourthDamage = arr1.filter( type => arr2.includes( type ) );
    let oneHalfDamage1 = arr1.filter( type => !arr2.includes( type ) )
    let oneHalfDamage2 = arr2.filter( type => !arr1.includes( type ) );
    let oneHalfDamage = [ ...oneHalfDamage1, ...oneHalfDamage2 ];
    fractionalDamage.fourth = [ ...oneFourthDamage ];
    fractionalDamage.half = [ ...oneHalfDamage ];

    return fractionalDamage;
}



export {getAllWeakness, removeDuplicateType, oneFourthAndHalfDamage}