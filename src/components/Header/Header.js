import React from 'react';
import { Link } from 'react-router-dom'
import { appHeader, appMenu } from './Header.scss';
import URL from '../Routes/Urls';
const Header = () => (
    <header className={ appHeader }>
        <nav className={appMenu}>
            <Link to={URL.ask.url}>ASK</Link>
            <Link to={URL.questionList.url}>Question List</Link>
        </nav>
    </header>
);

export default Header;