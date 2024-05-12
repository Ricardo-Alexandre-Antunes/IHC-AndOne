import React, { useEffect, useState } from "react";
import NavbarCompra from "../components/NavbarCompra";
import MyFooter from "../components/MyFooter";
import DetalhesPedido from "../components/DetalhesPedido";
import ResumoPedido from "../components/ResumoPedido";
import Pagamentos from "../components/Pagamentos";
import { Modal, Col, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ProductList from "../data/Products.json";
import "./PagamentoPage.css";

function PagamentoPage() {
    const navigate = useNavigate();
    const [selectedPaying, setSelectedPaying] = useState(localStorage.getItem('temp') ? JSON.parse(localStorage.getItem('temp'))['pagamento'] : '');
    const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('temp') ? JSON.parse(localStorage.getItem('temp'))['telefone'] : ''); 
    const [selectedBilling, setSelectedBilling] = useState(localStorage.getItem('temp') ? JSON.parse(localStorage.getItem('temp'))['faturacao'] : '');
    const [showModal, setShowModal] = useState(false);
    const temp = (localStorage.getItem('temp') ? JSON.parse(localStorage.getItem('temp')) : {});
    const [showProducts, setShowProducts] = useState(false);
    const toggleProducts = () => {
        setShowProducts(!showProducts);
    };
    temp['artigos'] = localStorage.getItem('cart') || '';
    temp['data'] = new Date().toLocaleDateString();
    temp['faturacao'] = temp['faturacao'] || ''; 
    const [encomenda, setEncomenda] = useState(JSON.parse(localStorage.getItem('temp')));



    const handleClickConfirmar = () => {
        setShowModal(true);
    };

    const handleConfirm = () => {
        // Redirect to the confirmation page
        let initialId = localStorage.getItem("id");
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const usedIds = orders.map(order => order.id);
        if (!initialId || usedIds.includes(Number(initialId))) {
            do {
                initialId = Math.floor(Math.random() * 10000) + 1;
            } while (usedIds.includes(initialId));
            localStorage.setItem("id", initialId);
        }
        console.log("id", initialId);
        const newOrders = [...orders, { id: Number(initialId), ...encomenda }];
        localStorage.setItem('orders', JSON.stringify([...orders, { id: Number(initialId), ...encomenda }]));
        const curUser = localStorage.getItem('curUser');
        let users = JSON.parse(localStorage.getItem('users'));
        let user = users.find(user => user.email === curUser);
        user.orders = newOrders;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.removeItem('cart');
        navigate('/confirmacao');
    };

    const checkIfError = () => {
        console.log(selectedPaying);
        console.log(phoneNumber);
        console.log(selectedBilling); 
        console.log(selectedPaying == '');
        console.log((selectedPaying === 'MBWay' || phoneNumber === ''));
        console.log(selectedBilling == '') ;
        return selectedPaying === undefined || selectedBilling === undefined || (selectedPaying === 'MBWay' && !isPhoneNumberValid(phoneNumber));
    }

    const isPhoneNumberValid = (number) => {
        const regex = /^9\d{8}$/;  
        return regex.test(number);  
    };

    const handleClick = (event) => {
        if (checkIfError()) {
            event.preventDefault();
            alert("Por favor, preencha todos os campos.\nCampos que faltam:" + (selectedBilling === undefined ? "\n\t Dados de faturação" : "") + (selectedPaying === undefined ? "\n\t Método de pagamento" : "") + (selectedPaying === 'MBWay' && phoneNumber === undefined ? "\n\t Telemóvel" : "") + (selectedPaying === 'MBWay' && !isPhoneNumberValid(phoneNumber) && phoneNumber !== undefined ? "\n\t Telemóvel inválido" : ""));
        } else {
            temp['pagamento'] = selectedPaying;
            temp['telefone'] = phoneNumber;
            temp['faturacao'] = selectedBilling;
            temp['artigos'] = localStorage.getItem('cart');
            temp['data'] = new Date().toLocaleDateString();
            localStorage.setItem('temp', JSON.stringify(temp));
            setEncomenda(temp);
            console.log(temp);
            setShowModal(true);
            handleClickConfirmar;
        }
    };

    return (
        <>
            <NavbarCompra currentStep="Pagamento"/>
            <Row>
                <Col md={9}>
                    <Pagamentos selectedPaying={selectedPaying} setSelectedPaying={setSelectedPaying} 
                                phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} 
                                selectedBilling={selectedBilling} setSelectedBilling={setSelectedBilling} />
                    <Row className="p-3">
                        <Col>
                            <Link to="/checkout">                       
                                <Button variant="danger" size="lg" block="true"><FontAwesomeIcon icon={faArrowLeft} /> Retroceder</Button>
                            </Link>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button variant="dark" size="lg" block="true" onClick={handleClick} >Resumo do Pedido <FontAwesomeIcon icon={faArrowRight} /></Button>
                        </Col>
                    </Row>
                </Col>
                <Col md={3}>
                    <ResumoPedido />
                    <DetalhesPedido />
                </Col>
            </Row>  
            <MyFooter />

            <Modal show={showModal} onHide={() => setShowModal(false)} style={{userSelect:'none'}}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalhes da Compra</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p style={{marginBottom: '5px'}}><strong>Método de Pagamento:</strong> {temp.pagamento}</p>
                {temp.pagamento === 'MBWay' && <p style={{marginBottom: '5px'}}><strong>Telefone:</strong> {temp.telefone}</p>}
                <p style={{marginBottom: '0px'}}><strong>Dados de Faturação:</strong></p>
                <div style={{ border: '1px solid #ddd', paddingLeft: '5px', fontSize: '0.8em', lineHeight: '1' }}>
                    {temp.faturacao.split(',').map((item, index) => (
                        <p key={index} style={{ margin: '0.5em 0' }}>{item}</p>
                    ))}
                </div>
                    
                <p onClick={toggleProducts} style={{ cursor: 'pointer', marginBottom: '0px' }}>
                    <strong>Artigos</strong> <FontAwesomeIcon icon={showProducts ? faArrowUp : faArrowDown} />
                </p>

                {JSON.parse(temp.artigos).map((item, index) => {
                    const product = ProductList[item.category].find(product => product.number === item.number);
                    return product ? (
                        <div key={index} className={`product-details ${showProducts ? '' : 'hide'}`}>
                            <p style={{ marginLeft: '0px', marginTop: '5px', marginBottom: '5px' }}><strong>Produto:</strong> {product.name}</p>
                            <p style={{ marginLeft: '0px', marginTop: '5px', marginBottom: '5px' }}><strong>Quantidade:</strong> {item.quantity}</p>
                            <p style={{ marginLeft: '0px', marginTop: '5px', marginBottom: '5px' }}><strong>Tamanho:</strong> {item.size}</p>
                            <p style={{ marginLeft: '0px', marginTop: '5px', marginBottom: '5px' }}><strong>Preço:</strong> {product.price * item.quantity}€</p>
                        </div>
                    ) : null;
                })}

                <p style = {{marginTop: '0px'}}><strong>Total:</strong> {JSON.parse(temp.artigos).reduce((acc, item) => {
                    const product = ProductList[item.category].find(product => product.number === item.number);
                    return product ? acc + product.price * item.quantity : acc;
                }, 0)}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Efetuar Pagamento
                    </Button>
                </Modal.Footer>
            </Modal> 
        </>
    );
}

export default PagamentoPage;