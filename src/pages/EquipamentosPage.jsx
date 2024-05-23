import React from "react";
import Navbar from "/src/components/MyNavbar";
import MyFooter from "/src/components/MyFooter";
import EquipamentosSearch from "/src/components/EquipamentosSearch";


function EquipamentosPage() {
    return (
        <>
            <div className="parent-container">
                <div className="navbar">
                    <Navbar activeID={2}/>
                </div>
                <div className="equipamentos-search" style={{ minHeight: '55vh' }}>
                    <EquipamentosSearch />
                </div>
                <div className="footer">
                    <MyFooter />
                </div>
            </div>
        </>
    );
}

export default EquipamentosPage;