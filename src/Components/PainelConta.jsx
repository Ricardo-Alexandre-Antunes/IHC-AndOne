import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import EncomendaPerfilCard from './EncomendaPerfilCard';
import { useNavigate } from 'react-router-dom'

function PainelConta(props) {
    const navigate = useNavigate();
    const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders')) || []);
    const curUser = localStorage.getItem('curUser');
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(user => user.email === curUser);
    const [name, setName] = useState(user.firstName + ' ' + user.lastName);
    const [newName, setNewName] = useState('');
    const [email, setEmail] = useState(user.email);
    const [billingDetails, setBillingDetails] = useState(user.billingData || []);
    const [editingIndex, setEditingIndex] = useState(null);
    const [tempDetail, setTempDetail] = useState({ name: '', address: '', postalCode: '', nif: '' });
    const [newAddress, setNewAddress] = useState('');
    const [newPostalCode, setNewPostalCode] = useState('');
    const [newNif, setNewNif] = useState('');

    // Function to generate EncomendaPerfilCard for each element in temp array
    const generateEncomendaCards = () => {
            return orders.map((item, index) => (
                <EncomendaPerfilCard key={index} item={item} />
            ));
    };

    useEffect(() => {
        localStorage.setItem('billingData', JSON.stringify(billingDetails));
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(user => user.email === curUser);
        user.billingData = billingDetails;
        localStorage.setItem('users', JSON.stringify(users));
      }, [billingDetails]);

    const handleDados = () => {
        props.setDados(true);
        props.setEncomendas(false);
    }

    const handleEncomendas = () => {
        props.setDados(false);
        props.setEncomendas(true);
    }

    const handleLogout = () => {
        localStorage.setItem('login', false);
        localStorage.setItem('curUser', '');
        localStorage.setItem('orders', '[]');
        localStorage.setItem('favorites', '[]');
        localStorage.setItem('billingData', '[]');
        navigate('/');
    }

    const handleRemove = (index) => {
        const newBillingDetails = [...billingDetails];
        newBillingDetails.splice(index, 1);
        setBillingDetails(newBillingDetails);
        localStorage.setItem('billingData', JSON.stringify(newBillingDetails));
      };
      
      const handleEdit = (index) => {
        setEditingIndex(index);
        setTempDetail(billingDetails[index]);
      };

      const handleSubmit = (index) => {
        if (validateInput(tempDetail.name, tempDetail.address, tempDetail.postalCode, tempDetail.nif)) {
          const newBillingDetails = [...billingDetails];
          newBillingDetails[index] = tempDetail;
          setBillingDetails(newBillingDetails);
          localStorage.setItem('billingData', JSON.stringify(newBillingDetails));
          setEditingIndex(null);
          setTempDetail({ name: '', address: '', postalCode: '', nif: '' });
        }
      };

      const handleAddBillingDetail = (e) => {
        e.preventDefault();
        if (validateInput(newName, newAddress, newPostalCode, newNif)) {
          setBillingDetails([...billingDetails, { name: newName, address: newAddress, postalCode: newPostalCode, nif: newNif }]);
          setNewName('');
          setNewAddress('');
          setNewPostalCode('');
          setNewNif('');
        }
      };

      const validateInput = (name, address, postalCode, nif) => {
        // Check if name is not empty
        if (!name.trim()) {
            alert('É preciso inserir nome');
            return false;
        }

        // Check if address is not empty
        if (!address.trim()) {
          alert('É preciso adicionar uma morada');
          return false;
        }
      
        // Check if postal code is correctly formatted
        const postalCodeRegex = /^[0-9]{4}-[0-9]{3}$/;
        if (!postalCodeRegex.test(postalCode)) {
          alert('O código postal deve ter o formato XXXX-XXX');
          return false;
        }
      
        // Check if NIF has 9 digits
        if (nif.length !== 9 || isNaN(nif)) {
          alert('O NIF deve ter 9 dígitos numéricos');
          return false;
        }
      
        return true;
      };

    

    return (
        <>
            <Row>
                <Col md={3}>
                    <Container fluid className="d-flex justify-content-begin p-3"> 
                        <div style={{ width: '100%', backgroundColor: '#333', color: 'white', padding: '1rem' }}>
                            <Row>
                                <h3>Painel de conta</h3>
                            </Row>
                            <Row>
                                <Button style={{ backgroundColor: '#333', border: 0 }} size="lg" className="d-flex justify-content-begin" onClick={handleDados}>Dados Pessoais</Button>
                                <Button style={{ backgroundColor: '#333', border: 0 }} size="lg" className="d-flex justify-content-begin" onClick={handleEncomendas}>Minhas encomendas/faturas</Button>
                                <Button style={{ backgroundColor: '#333', border: 0, color: 'red' }} size="lg" className="d-flex justify-content-begin" onClick={handleLogout}>Terminar sessão</Button>
                            </Row>
                        </div>
                    </Container>
                </Col>
                <Col md={9}>
                    {props.dados && (
                        <Container fluid className="d-flex justify-content-end p-3"> 
                            <div style={{ width: '100%', backgroundColor: '#333', color: 'white', padding: '1rem' }}>
                                <Row>
                                    <Col>
                                        <p>Nome: {name}</p>
                                        <p>Email: {email}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h4>Dados de faturação</h4>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                        {billingDetails.map((detail, index) => (
                                          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', flex: '0 0 calc(50% - 20px)' }}>
                                            <Row>
                                              <Col md={8}>
                                                <div>
                                                  <label>Nome: </label>
                                                  {editingIndex === index ? (
                                                    <> <input type="text" value={tempDetail.name} onChange={e => setTempDetail({ ...tempDetail, name: e.target.value })} /></>
                                                  ) : (
                                                    <> {detail.name}</>
                                                  )}
                                                </div>
                                                <div>
                                                  <label>Endereço: </label>
                                                  {editingIndex === index ? (
                                                    <> <input type="text" value={tempDetail.address} onChange={e => setTempDetail({ ...tempDetail, address: e.target.value })} /></>
                                                  ) : (
                                                    <> {detail.address}</>
                                                  )}
                                                </div>
                                                <div>
                                                  <label>Código Postal: </label>
                                                  {editingIndex === index ? (
                                                    <> <input type="text" value={tempDetail.postalCode} onChange={e => setTempDetail({ ...tempDetail, postalCode: e.target.value })} /></>
                                                  ) : (
                                                    <> {detail.postalCode}</>
                                                  )}
                                                </div>
                                                <div>
                                                  <label>NIF: </label>
                                                  {editingIndex === index ? (
                                                    <> <input type="text" value={tempDetail.nif} onChange={e => setTempDetail({ ...tempDetail, nif: e.target.value })} /></>
                                                  ) : (
                                                    <> {detail.nif}</>
                                                  )}
                                                </div>
                                              </Col>
                                              <Col md={4}>
                                                <Row className="p-1">
                                                  <button onClick={() => handleRemove(index)}>Remover</button>
                                                </Row>
                                                <Row className="p-1">
                                                  {editingIndex === index ? (
                                                    <button onClick={() => handleSubmit(index)}>Submeter</button>
                                                  ) : (
                                                    <button onClick={() => handleEdit(index)}>Editar</button>
                                                  )}
                                                </Row>
                                              </Col>
                                            </Row>
                                          </div>
                                        ))}
                                        </div>
                                    <div className="pt-2"><h4>Adicione novos dados de faturação</h4></div>
                                    <div className="pt-1">
                                      <form className="p-2">
                                        <Row>
                                          <Col> 
                                            <input type="text" placeholder="Nome" value={newName} onChange={e => setNewName(e.target.value)} />
                                          </Col>
                                          <Col>
                                            <input type="text" placeholder="Endereço" value={newAddress} onChange={e => setNewAddress(e.target.value)} />
                                          </Col>
                                          <Col>
                                            <input type="text" placeholder="Código Postal" value={newPostalCode} onChange={e => setNewPostalCode(e.target.value)} />
                                          </Col>
                                          <Col>
                                            <input type="text" placeholder="NIF" value={newNif} onChange={e => setNewNif(e.target.value)} />
                                          </Col>
                                          <Col>
                                            <Button onClick={handleAddBillingDetail} style={{ width: 200 }}>Adicionar</Button>  
                                          </Col>
                                        </Row>
                                      </form>
                                    </div>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    )}
                    {props.encomendas && (
                        <Container fluid className="d-flex justify-content-end p-3"> 
                            <div style={{ width: '100%', backgroundColor: '#333', color: 'white', padding: '1rem' }}>
                                {generateEncomendaCards()}
                            </div>
                        </Container>
                    )}
                </Col>
            </Row>
        </>
    );
}

export default PainelConta;