import React, { useState } from "react";
import MyNavbar from "../components/MyNavbar";
import MyFooter from "../components/MyFooter";
import PainelConta from "../components/PainelConta";
import { Row, Col } from 'react-bootstrap'; // Supondo que você esteja usando react-bootstrap

function PerfilPage() {
    const [dados, setDados] = useState(true);
    const [encomendas, setEncomendas] = useState(false);

    return (
        <>
            <MyNavbar activeID={6} />
            <div style={{ minHeight: '55vh' }}>
                <Row className="d-flex justify-content-begin pt-3">
                    <Col md={3}>
                        <h3 className="p-3 pb-0">Olá Utilizador</h3>
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