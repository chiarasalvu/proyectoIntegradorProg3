import React from 'react';
import { Link } from 'react-router-dom';

function Header() {

    return (
        <header className='encabezado'>
            <ul>
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/17/K-ON_anime_logo.png" alt="logo" className="logo" />
            </ul>
            <nav className='señaladores'>
                <ul>
                    <li>
                        <Link to='/' className='colorselector'>Home</Link>
                    </li>
                    <li>
                        <Link to='/favoritos' className='colorselector'>Favoritos</Link>
                    </li>
                    <li>
                        <Link to='/peliculas' className='colorselector'>Peliculas</Link>
                    </li>
                    <li>
                        <Link to='/series' className='colorselector'>Series</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;