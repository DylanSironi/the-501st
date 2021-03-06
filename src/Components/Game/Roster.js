import React from 'react';
import Troopers from './Troopers';

const Roster = props => {
    const mappedTroopers = props.myTroopers.map((troopers, i) => (
        <Troopers 
            key={i}
            troopers={troopers}
            nameFn={props.nameFn}
            KIAFn={props.KIAFn}/>
    ))
    return (
        <div>
            <div className='trooper-flex'>
                {mappedTroopers}
            </div>
        </div>
    )
}
export default Roster;