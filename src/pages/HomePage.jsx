import React from 'react';
import MyNavbar from '/src/components/MyNavbar';
import MyFooter from '/src/components/MyFooter';
import HomeCarousel from '/src/components/HomeCarousel';

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