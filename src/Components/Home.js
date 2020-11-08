import React from 'react';
import homepage from '../home.jpg';

function Home(props) {
    return (
        <div>
            <img className="home_page"src={homepage} alt="this is car iservice" />
        </div>
    );
}

export default Home;