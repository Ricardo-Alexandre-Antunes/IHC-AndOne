import React, { useEffect, useState } from "react";
import MyNavbar from "../components/MyNavbar";
import MyFooter from "../components/MyFooter";
import PainelConta from "../components/PainelConta";
import { Row, Col } from 'react-bootstrap'; // Supondo que você esteja usando react-bootstrap

function PerfilPage() {
    const [dados, setDados] = useState(true);
    const [encomendas, setEncomendas] = useState(false);
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const handleStorageChange = () => {
          const curUser = localStorage.getItem('curUser');
          let users = JSON.parse(localStorage.getItem('users')) || [];
          let user = users.find(user => user.email === curUser);
          if (user) {
            setFirstName(user.firstName);
          }
        };
      
        // Listen for changes to local storage  
        window.addEventListener('storage', handleStorageChange);
      
        // Call the function once to handle the current state of local storage
        handleStorageChange();
      
        // Cleanup: remove the event listener when the component is unmounted
        return () => {
          window.removeEventListener('storage', handleStorageChange);
        };
      }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount
    return (
        <>
            <MyNavbar activeID={6} />
            <div style={{ minHeight: '55vh' }}>
                <Row className="d-flex justify-content-begin pt-3">
                    <Col md={3}>
                        <h3 className="p-3 pb-0">Olá {firstName}</h3>
                    </Col>
                    <Col md={9}>
                        {dados && <Col><h3 className="p-3 pb-0" >Dados Pessoais</h3></Col>}
                        {encomendas && <Col><h3 className="p-3 pb-0">Minhas encomendas/faturas</h3></Col>}
                    </Col>
                </Row>
                <PainelConta dados={dados} setDados={setDados} 
                            encomendas={encomendas} setEncomendas={setEncomendas} />
            </div>
            <MyFooter />
        </>
    );
}

export default PerfilPage;