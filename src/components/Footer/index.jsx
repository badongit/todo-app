import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';

Footer.propTypes = {
    activeCount: PropTypes.number,
    changeTodosShow: PropTypes.func,
    show: PropTypes.string,
};

Footer.defaultProps = {
    activeCount: 0,
    changeTodosShow: null,
    show: '',
}

function Footer(props) {
    const { activeCount, changeTodosShow, show } = props;

    return (
        <div className="footer">
            <p>{activeCount} items left</p>
            <div className="control">
                <button 
                    onClick={() => changeTodosShow('')}
                    style={{ border: (show === '') ? '1px solid rgb(179, 179, 179)' : '', }}
                >All</button>

                <button 
                    onClick={() => changeTodosShow('active')}
                    style={{ border: (show === 'active') ? '1px solid rgb(179, 179, 179)' : '' }}
                >Active</button>

                <button 
                    onClick={() => changeTodosShow('completed')} 
                    style={{ border: (show === 'completed') ? '1px solid rgb(179, 179, 179)' : '' }}
                >Completed</button>
            </div>
        </div>
    );
}

export default Footer;