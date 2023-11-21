import { useState } from "react";

function Form(props) {
    const {title, buttonTitle, handleClick, errorMessage} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);


    const focusedStyles = {
        boxShadow: '0px 0px 10px 2px rgba(172, 29, 156, 0.2) inset',
        border: '1px solid #881CDA',
        marginBottom: (focusedInput === 'password' && errorMessage) ? '1rem' : '1.5rem'
    }

    const handleFocus = (input) => {
        setFocusedInput(input);
    }
   
    const handleBlur = () => {
        setFocusedInput(null);
    }
    const handleSubmit = async () => {
      await  handleClick(email, password);
        setEmail('');
        setPassword('');
    }

    const handleKeyDown = (evt) => {
        if (evt.key === 'Enter') {
            handleSubmit();
        }
    }
 
    return (
        <div className="form">
            {buttonTitle && <h2 style={{alignSelf:'center'}}>{title}</h2>}
            <p>логин</p>
            <input 
            type="email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
            style={(focusedInput === 'email') ? focusedStyles :{}}
            onKeyDown={handleKeyDown}
            placeholder="example@domain.com" />
            <p>пароль</p>
            <input 
            onFocus={() => handleFocus('password')}
            onBlur={handleBlur}
            type="password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            style={(focusedInput === 'password') 
            ? {...focusedStyles, marginBottom:`${errorMessage ? '1rem' : '1.5rem'}`} 
            :{marginBottom:`${errorMessage ? '1rem' : '1.5rem'}`}}
            onKeyDown={handleKeyDown}
            placeholder="Пароль" />
            {errorMessage && <p style={{marginBottom:'1rem', 
            textTransform:'uppercase', 
            color:'red',
            fontSize:'14px'}} className="errorMessage">{errorMessage}</p>}

            <button onClick={
                (evt) => {
                evt.preventDefault();
                handleSubmit();
            }}>{buttonTitle}</button>
        </div>
    )
}


export {Form}