import React from "react";
import MyNavbar from "../components/MyNavbar";
import MyFooter from "../components/MyFooter";
import AcessoriosSearch from "../components/AcessoriosSearch";

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