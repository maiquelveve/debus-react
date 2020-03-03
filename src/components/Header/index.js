import React from 'react';
import { Link } from 'react-router-dom'

import Menus from '../Menus';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">DeBus</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <Menus />
                </div>
            </div>
        </nav>
    );
}

export default Header