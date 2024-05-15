import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import EncomendaPerfilCard from './EncomendaPerfilCard';
import { useNavigate } from 'react-router-dom'
import { Modal, Form } from 'react-bootstrap';
import '../css/login.css';

function PainelConta(props) {
    const navigate = useNavigate();
    const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders')) || []);
    const curUser = localStorage.getItem('curUser');
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(user => user.email === curUser);
    const [name, setName] = useState(user.firstName + ' ' + user.lastName);
    const [newName, setNewName] = useState('');
    const [newName2, setNewName2] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [email, setEmail] = useState(user.email);
    const [billingDetails, setBillingDetails] = useState(user.billingData || []);
    const [editingIndex, setEditingIndex] = useState(null);
    const [tempDetail, setTempDetail] = useState({ name: '', address: '', postalCode: '', nif: '' });
    const [newAddress, setNewAddress] = useState('');
    const [newPostalCode, setNewPostalCode] = useState('');
    const [newNif, setNewNif] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [indexToRemove, setIndexToRemove] = useState(null);


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
      }, [billingDetails], [name], [email]);

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

    const handleRemove = () => {
        const newBillingDetails = [...billingDetails];
        newBillingDetails.splice(indexToRemove, 1);
        setBillingDetails(newBillingDetails);
        localStorage.setItem('billingData', JSON.stringify(newBillingDetails));
        setShowModal3(false);
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
        if (!name.trim()) {
            alert('É preciso inserir nome');
            return false;
        }

        if (!address.trim()) {
          alert('É preciso adicionar uma morada');
          return false;
        }
      
        const postalCodeRegex = /^[0-9]{4}-[0-9]{3}$/;
        if (!postalCodeRegex.test(postalCode)) {
          alert('O código postal deve ter o formato XXXX-XXX');
          return false;
        }
      
        if (nif.length !== 9 || isNaN(nif)) {
          alert('O NIF deve ter 9 dígitos numéricos');
          return false;
        }
      
        return true;
      };

    const openModal = () => {
      setShowModal(true);
    };

    const openModal2 = () => {
      setShowModal2(true);
    };

    const openModal3 = (index) => {
      console.log(index)
      setShowModal3(true);
      setIndexToRemove(index);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSubmitAccountEdit = (e) => {
        e.preventDefault();
        if (newName2.trim() === '' && newEmail.trim() === '' && password.trim() === '' && newLastName.trim() === '') {
          alert('É preciso preencher pelo menos um campo');
          return;
        }

        const allEmails = users.map(user => user.email);
        console.log(user)

        if (allEmails.includes(newEmail) && newEmail !== user.email) {
          alert('Email já em uso. Se tem a certeza que não tem conta, contacte-nos.');
          return;
        }

        if (!newEmail.match(/\S+@\S+\.\S+/) && newEmail.trim() !== '') {
          alert('Email inválido');
          return;
        }
        user.firstName = newName2.trim() !== '' || newName2.trim() === undefined ? newName2 : user.firstName;
        user.lastName = newLastName.trim() !== '' || newLastName.trim() === undefined ? newLastName : user.lastName;
        user.email = newEmail.trim() !== '' ? newEmail : user.email;
        user.password = password.trim() !== '' ? password : user.password;
        console.log(user)
        localStorage.setItem('curUser', user.email);
        localStorage.setItem('users', JSON.stringify(users));
        setName(user.firstName + ' ' + user.lastName);
        setEmail(user.email);
        setNewName2('');
        setNewEmail('');
        setPassword('');
        setNewLastName('');
        closeModal();
        window.dispatchEvent(new Event('storage'));
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
                                <Button style={{ backgroundColor: '#333', border: 0, color: 'red' }} size="lg" className="d-flex justify-content-begin" onClick={openModal2}>Terminar sessão</Button>
                            </Row>
                        </div>
                    </Container>
                </Col>
                <Col md={9}>
                    {props.dados && (
                        <Container fluid className="d-flex justify-content-end p-3"> 
                            <div style={{ width: '100%', backgroundColor: '#333', color: 'white', padding: '1rem' }}>
                                <Row>
                                    <Col md={4}>
                                      <p style={{ fontSize: 18 }}>Nome: {name}</p>
                                      <p style={{ fontSize: 18 }}>Email: {email}</p>
                                    </Col>
                                    <Col md={8}>
                                      <Button variant="light" onClick={openModal} style={{marginLeft: '77%'}}>Editar Perfil </Button>
                                    </Col>
                                </Row>
                                <Row className="pt-2">
                                    <Col>
                                        <h4>Dados de faturação</h4>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                        {billingDetails.map((detail, index) => (
                                          <div key={index} style={{ border: '1px solid #ccc', borderRadius:'5px', padding: '20px', margin: '10px', flex: '0 0 calc(50% - 20px)' , color: 'white', backgroundColor:'#696969'  }}>
                                            <Row>
                                              <Col md={8}>
                                                <div>
                                                  <label>Nome: </label>
                                                  {editingIndex === index ? (
                                                    <> <input type="text" value={tempDetail.name} onChange={e => setTempDetail({ ...tempDetail, name: e.target.value })}/></>
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
                                                  <Button variant='danger' onClick={() => openModal3(index)}>Remover</Button>
                                                </Row>
                                                <Row className="p-1">
                                                  {editingIndex === index ? (
                                                    <Button variant='success' onClick={() => handleSubmit(index)}>Submeter</Button>
                                                  ) : (
                                                    <Button variant = 'light' onClick={() => handleEdit(index)}>Editar</Button>
                                                  )}
                                                </Row>
                                              </Col>
                                            </Row>
                                          </div>
                                        ))}
                                        </div>
                                    <div className="pt-3"><h4>Adicione novos dados de faturação</h4></div>
                                    <div className="pt-1">
                                      <form className="p-2">
                                        <Row>
                                          <Col> 
                                            <p>Nome</p>
                                            <input type="text" placeholder=" Nome" value={newName} onChange={e => setNewName(e.target.value)} style={{borderRadius: '8px'}}/>
                                          </Col>
                                          <Col>
                                            <p>Endereço</p>
                                            <input type="text" placeholder=" Endereço" value={newAddress} onChange={e => setNewAddress(e.target.value)} style={{borderRadius: '8px'}} />
                                          </Col>
                                          <Col>
                                            <p>Código Postal</p>
                                            <input type="text" placeholder=" Código Postal" value={newPostalCode} onChange={e => setNewPostalCode(e.target.value)} style={{borderRadius: '8px'}} />
                                          </Col>
                                          <Col>
                                            <p>NIF</p>
                                            <input type="text" placeholder=" NIF" value={newNif} onChange={e => setNewNif(e.target.value)}  style={{borderRadius: '8px'}}/>
                                          </Col>
                                          <Col className="d-flex">
                                            <Row>
                                              <Button variant="success" onClick={handleAddBillingDetail} style={{ width: 200, marginTop: 35 }}>Adicionar</Button>
                                            </Row>
                                          </Col>
                                        </Row>
                                      </form>
                                    </div>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    )}
                    {props.encomendas && ( orders.length > 0 ? (
                      <Container fluid className="d-flex justify-content-end p-3"> 
                        <div style={{ width: '100%', backgroundColor: '#333', color: 'white', padding: '1rem' }}>
                          {generateEncomendaCards()}
                        </div>
                      </Container>
                    ) : (
                      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                      <div className="text-center">
                        <h2>Sem encomendas anteriores</h2>
                        <p>Se efetuou uma compra recentemente e não aparece aqui, pode ainda estar a ser processada.</p>
                      </div>
                    </Container>
                    ))}
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)} style={{ userSelect: 'none' }}>
              <Modal.Header closeButton>
                  <Modal.Title>Editar Conta</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form onSubmit={handleSubmitAccountEdit}>
                      <Form.Group controlId="formName">
                          <Form.Label>Novo Nome</Form.Label>
                          <Form.Control type="text" placeholder="Novo Nome" value={newName2} onChange={(e) => setNewName2(e.target.value)} />
                      </Form.Group>
                      <Form.Group controlId="formLastName" className="pt-2">
                          <Form.Label>Novo Apelido</Form.Label>
                          <Form.Control type="text" placeholder="Novo Apelido" value={newLastName} onChange={(e) => setNewLastName(e.target.value)} />
                      </Form.Group>
                      <Form.Group controlId="formEmail" className="pt-2">
                          <Form.Label>Novo Email</Form.Label>
                          <Form.Control type="email" placeholder="Novo Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                      </Form.Group>
                      <Form.Group controlId="formPassword" className="pt-2">
                          <Form.Label>Nova Senha</Form.Label>
                          <Form.Control type="password" placeholder="Nova Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </Form.Group>
                  </Form>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="primary" type="submit" onClick={handleSubmitAccountEdit}>
                    Salvar Alterações
                  </Button>
                  <Button variant="secondary" onClick={closeModal}>
                      Fechar
                  </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={showModal2} onHide={() => setShowModal2(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Terminar Sessão</Modal.Title>
              </Modal.Header>
              <Modal.Body>Tem a certeza que pretende terminar a sessão?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowModal2(false)}>
                    Cancelar
                  </Button>
                  <Button variant="danger" onClick={handleLogout} >
                    Terminar sessão
                  </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={showModal3} onHide={() => setShowModal3(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Remover dados de faturação</Modal.Title>
              </Modal.Header>
              <Modal.Body>Tem a certeza que pretende remover os dados de faturação?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowModal3(false)}>
                    Cancelar
                  </Button>
                  <Button variant="danger" onClick={() => handleRemove()} >
                    Remover
                  </Button>
              </Modal.Footer>
            </Modal>
        </>
    );
}

export default PainelConta;