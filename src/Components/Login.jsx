import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/login.css'
import Button from 'react-bootstrap/Button';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email2, setEmail2] = useState('')
  const [password2, setPassword2] = useState('')
  const [emailError2, setEmailError2] = useState('')
  const [passwordError2, setPasswordError2] = useState('')

  const navigate = useNavigate()

  const previousPage = localStorage.getItem('previousPage');

  const login = () => {
    if (!email || !email.match(/\S+@\S+\.\S+/)) {
      setEmailError('Por favor, insira o seu email.')
      return;
    }
    if (!password) {
      setPasswordError('Por favor, insira a sua senha.')
      return;
    }
    const users = JSON.parse(localStorage.getItem('users'));
    if (users === null) {
      setEmailError('Email ou senha incorretos.')
      return;
    }
    const singleuser = users.find(user => user.email === email && user.password === password);
    console.log(singleuser);
    if (!singleuser) {
      alert('Email ou senha incorretos.')
      return;
    }
    setEmailError('')
    setPasswordError('')
    localStorage.setItem('login', true)
    localStorage.setItem('curUser', email);
    const user = JSON.parse(localStorage.getItem('users')).find(user => user.email === email);
    localStorage.setItem('orders', user && user.orders ? JSON.stringify(user.orders) : '[]');
    localStorage.setItem('favorites', user && user.favorites ? JSON.stringify(user.favorites) : '[]');
    localStorage.setItem('billingData', user && user.billingData ? JSON.stringify(user.billingData) : '[]');
    navigate(previousPage)
  }

  const createAccount = () => {
    if (firstName === '' || lastName === '') {
      alert('Por favor, insira o seu primeiro e último nome.')
      return;
    }

    if (email2 === '' || !email2.match(/\S+@\S+\.\S+/)) {
      setEmailError2('Por favor, insira o seu email no formato correto')
      return;
    }
    if (localStorage.getItem('users') && JSON.parse(localStorage.getItem('users')).find(user => user.email === email2)) {
      setEmailError2('Este email já está em uso.')
      return;
    }
    if (!password2) {
      setPasswordError2('Por favor, insira a sua senha.')
      return;
    }
    setEmailError2('')
    setPasswordError2('')
    localStorage.setItem('users', JSON.stringify([...(JSON.parse(localStorage.getItem('users')) || []), { email: email2, password: password2, firstName, lastName, orders: [], favorites: [], billingData: [] }]));
    localStorage.setItem('curUser', email2);
    localStorage.setItem('login', true);
    const user = JSON.parse(localStorage.getItem('users')).find(user => user.email === email2);
    localStorage.setItem('orders', user && user.orders ? JSON.stringify(user.orders) : '[]');
    localStorage.setItem('favorites', user && user.favorites ? JSON.stringify(user.favorites) : '[]');
    localStorage.setItem('billingData', user && user.billingData ? JSON.stringify(user.billingData) : '[]');
    navigate(previousPage)
  }

  return (
    <div className={'mainContainer'}>
      <div className='loginContainer'>
        <div className={'titleContainer'}>
          <div>Iniciar Sessão</div>
        </div>

        <br />
        
        <div className={'inputContainer'}>
          <label className="errorLabel">{emailError}</label>
          <input
            value={email}
            placeholder="Insira o seu email..."
            onChange={(ev) => setEmail(ev.target.value)}
            className={'inputBox'}
          />
          
        </div>

        <br />

        <div className={'inputContainer'}>
          <label className="errorLabel">{passwordError}</label>
          <input
            type={'password'}
            value={password}
            placeholder="Insira a sua password..."
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
          />
          
        </div>

        <br />

        <div className={'inputContainer'}>
          <Button className={'inputButton'} variant='dark' onClick={login}> Iniciar Sessão </Button>
        </div>
      </div>


      <div className={'createAccountContainer'}>
        <div className={'titleContainer'}>
          <div>Criar Conta</div>
        </div>

        <br />

        <div className={'inputContainer'}>
          <input
            placeholder="Insira o primeiro nome..."
            onChange={(ev) => setFirstName(ev.target.value)}
            className={'inputBox'}
          />
        </div>

        <br />

        <div className={'inputContainer'}>
          <input
            placeholder="Insira o último nome..."
            onChange={(ev) => setLastName(ev.target.value)}
            className={'inputBox'}
          />
        </div>

        <br />

        <div className={'inputContainer'}>
          <label className="errorLabel">{emailError2}</label>
          <input
            value={email2}
            placeholder="Insira o seu email..."
            onChange={(ev) => setEmail2(ev.target.value)}
            className={'inputBox'}
          />
          
        </div>

        <br />

        <div className={'inputContainer'}>
          <label className="errorLabel">{passwordError2}</label>
          <input
            type={'password'}
            value={password2}
            placeholder="Insira a sua password..."
            onChange={(ev) => setPassword2(ev.target.value)}
            className={'inputBox'}
          />
          
        </div>

        <br />

        <div className={'inputContainer'}>
          <Button className={'createAccountBtn'} variant='dark' onClick={createAccount}> Criar conta </Button>
        </div>

      </div>
    </div>
  )
}

export default Login