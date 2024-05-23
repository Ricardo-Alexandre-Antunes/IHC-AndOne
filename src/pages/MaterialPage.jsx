import React from "react";
import MyNavbar from "/src/components/MyNavbar";
import MyFooter from "/src/components/MyFooter";
import MaterialSearch from "/src/components/MaterialSearch";

function MaterialPage() {
    return (
        <>
            <div className="parent-container">
                <div className="navbar">
                    <MyNavbar activeID={5} />
                </div>
                <div className="material-search" style={{ minHeight: '55vh' }}>
                    <MaterialSearch/>
                </div>
                <div className="footer">
                    <MyFooter />
                </div>    
            </div>
        </>
    );
}

export default MaterialPage;