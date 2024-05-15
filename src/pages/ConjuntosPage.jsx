import React from "react";
import MyNavbar from "../components/MyNavbar";
import MyFooter from "../components/MyFooter";

function ConjuntosPage() {
    return (
        <>
        <MyNavbar activeID={4} />
            <div style={{textAlign:'center'}}>
                <h1 style={{ minHeight: '5vh', marginTop: '40px' }}>Conjuntos</h1>
                <p style={{ minHeight: '57vh', marginTop: '40px', fontSize: '20px' }}> Página em desenvolvimento... Fica atento! </p>
            </div>
        <MyFooter />
        </>
    );
}

export default ConjuntosPage;