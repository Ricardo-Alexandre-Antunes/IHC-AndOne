import React from "react";
import MyNavbar from "/src/components/MyNavbar";
import MyFooter from "/src/components/MyFooter";
import AcessoriosSearch from "/src/components/AcessoriosSearch";

function AcessoriosPage() {
    return (
        <>
            <div className="parent-container">
                <div className="navbar">
                    <MyNavbar activeID={3} />
                </div>
                <div style={{ minHeight: '55vh' }}>
                    <AcessoriosSearch />
                </div>
                <div className="footer">
                    <MyFooter />
                </div>
            </div>
        </>
    );
}

export default AcessoriosPage;