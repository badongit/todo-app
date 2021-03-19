import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './Todo.scss';

Todo.propTypes = {
    onToggleComplete: PropTypes.func,
    todo: PropTypes.object,
    onDeleteClick: PropTypes.func,
    onChangeTitle: PropTypes.func,
    disabled: PropTypes.bool,
    editTodo: PropTypes.func,
};

Todo.default = {
    onToggleComplete: null,
    onDeleteClick: null,
    onChangeTitle: null,
    editTodo: null,
    todo: {},
    disabled: false,
}

function Todo(props) {
    const { todo, onToggleComplete, onDeleteClick, onChangeTitle, disabled, editTodo } = props;
    const { completed, id, title } = todo;  
    const [value, setValue] = useState(title);
    const inputTitleRef = useRef(null);

    const ENTER_KEY = 13;
    const ESC_KEY = 27;

    useEffect( () => {
        inputTitleRef.current.focus();

        console.log('focus');
    }, [disabled])

    const handleToggleComplete = () => {
        if(!onToggleComplete) 
            return;
        onToggleComplete(id);
    }

    const handleDeleteClick = () => {
        if(!onDeleteClick)
            return;
        onDeleteClick(id);
    }

    const handleKeyPress = (e) => {
        if(e.which === ENTER_KEY){
            console.log(e.key);
            
            if(!value) {
                onDeleteClick(id);
                return;
            }

            if(!editTodo)
                return;
            editTodo(null);

            if(!onChangeTitle)
                return;
            onChangeTitle(id, value);

            return;
        }  
    }

    const cancelInputTitle = (e) => {
        if(e.which === ESC_KEY) {
            console.log(e.key);

            setValue(title);

            editTodo(null);

            return;
        }
    }

    const handleDoubleClickTodo = () => {
        if(!editTodo)
            return;

        editTodo(id);
    }

    const handleBlur = () => {
        if(!value) {
            onDeleteClick(id);
            return;
        } 

        editTodo(null);
        onChangeTitle(id, value);
    }

    const handleFocus = () => {
        const len = inputTitleRef.current.value.length;
        inputTitleRef.current.setSelectionRange(len, len);
    }

    return (
        <div className="todo"
            onDoubleClick={handleDoubleClickTodo}
        >
            <div className="checkbox"
                onClick={handleToggleComplete}
            >
                <div className={`label ${completed ? '' : 'not-check'}`}>	✔</div>
            </div>
            <input
                style={{ 
                    textDecoration: (completed && disabled)  ? 'line-through' : '',
                    color:  (completed && disabled) ? 'gray' : 'black',
                    border: disabled ? 'none' : '1px solid black',
                }}
                ref={inputTitleRef}
                disabled={disabled ? 'disabled' : ''}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyPress={handleKeyPress}
                onBlur={handleBlur}
                onKeyDown={cancelInputTitle}
                onFocus={handleFocus}
            ></input>
            <button 
                onClick={handleDeleteClick}
            >✘</button>
        </div>
    );
}

export default Todo;