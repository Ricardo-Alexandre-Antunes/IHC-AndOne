import React from 'react';
import MyNavbar from '../components/MyNavbar';
import MyFooter from '../components/MyFooter';
import HomeCarousel from '../components/HomeCarousel';

function HomePage() {
    return (
        <>
            <MyNavbar />
            <div style={{ Height: 200 }}>
                <HomeCarousel />
            </div>
            <MyFooter />
        </>
    )
}

export default HomePage;