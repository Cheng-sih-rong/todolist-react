import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';



function Header() {

    return (
        <div className="header flex-between">
            <h1>TodoList</h1>
            <ul className="flex nav gap-20">
                <NavLink to="/undo" >待辦項目</NavLink>
                <NavLink to="/done" >完成項目</NavLink>
                <Redirect to="/undo" />
            </ul>


        </div>
    );
}

export default Header;
