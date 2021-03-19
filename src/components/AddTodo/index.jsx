import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AddTodo.scss';

AddTodo.propTypes = {
    addTodo: PropTypes.func,
    toggleCompletedAll: PropTypes.func,
    isCompletedAll: PropTypes.bool,
};

AddTodo.default = {
    addTodo: null,
    toggleCompletedAll: null,
    isCompletedAll: false,
}

function AddTodo(props) {
    const { addTodo, toggleCompletedAll, isCompletedAll } = props;
    const [value, setValue] = useState('');
    const ENTER_KEY = 13;

    const handleChangeValue = (e) => {
        setValue(e.target.value);
    }

    const handlePressEnter = (e) => {
        if(e.which === ENTER_KEY && value){
            if(!addTodo)
                return;
            addTodo(value);
            setValue('');
        }
    }

    return (
        <div className="add-todo">
            <div className="checkbox-all"
                onClick={toggleCompletedAll}
            >
                <div className={`label ${ isCompletedAll ? 'checked' : '' }`} >✔</div>
            </div>
            <input 
                type="text"
                value={value}
                placeholder="What needs to be done ?"
                onChange={handleChangeValue}
                onKeyPress={handlePressEnter}
            />
        </div>
    );
}

export default AddTodo;