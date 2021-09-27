import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import './Header.scss'

export const Header = () => {
    return (
        <header className="app-header">
            <Link to="/">
                <img src={logo} alt="Logo"/>
            </Link>
        </header>
    )
}
