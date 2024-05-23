import React from "react";
import Navbar from "/src/components/MyNavbar";
import MyFooter from "/src/components/MyFooter";
import ShoeSearch from "/src/components/ShoeSearch";


function SapatilhasPage() {
    return (
        <>
            <div className="parent-container">
                <div className="navbar">
                    <Navbar activeID={1}/>
                </div>
                <div className="shoe-search" style={{ minHeight: '55vh' }}>
                    <ShoeSearch />
                </div>
                <div className="footer">
                    <MyFooter />
                </div>
            </div>
        </>
    );
}

export default SapatilhasPage;