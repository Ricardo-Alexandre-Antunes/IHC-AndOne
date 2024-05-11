import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/login.css'
import Button from 'react-bootstrap/Button';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [zip, setZip] = useState('')
  const [email2, setEmail2] = useState('')
  const [password2, setPassword2] = useState('')
  const [emailError2, setEmailError2] = useState('')
  const [passwordError2, setPasswordError2] = useState('')

  const navigate = useNavigate()

  const login = () => {
    
  }

  const createAccount = () => {

  }

  return (
    <div className={'mainContainer'}>
      <div className='loginContainer'>
        <div className={'titleContainer'}>
          <div>Iniciar Sessão</div>
        </div>

        <br />

        <div className={'inputContainer'}>
          <input
            value={email}
            placeholder="Insira o seu email..."
            onChange={(ev) => setEmail(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{emailError}</label>
        </div>

        <br />

        <div className={'inputContainer'}>
          <input
            value={password}
            placeholder="Insira a sua password..."
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{passwordError}</label>
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
          <input
            placeholder="Insira a sua morada..."
            onChange={(ev) => setAddress(ev.target.value)}
            className={'inputBox'}
          />
        </div>

        <br />

        <div className={'inputContainer'}>
          <input
            placeholder="Insira o código postal..."
            onChange={(ev) => setZip(ev.target.value)}
            className={'inputBox'}
          />
        </div>

        <br />

        <div className={'inputContainer'}>
          <input
            value={email2}
            placeholder="Insira o seu email..."
            onChange={(ev) => setEmail2(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{emailError2}</label>
        </div>

        <br />

        <div className={'inputContainer'}>
          <input
            value={password2}
            placeholder="Insira a sua password..."
            onChange={(ev) => setPassword2(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{passwordError2}</label>
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