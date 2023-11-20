import { useState } from "react";

function Form(props) {
    const {title, buttonTitle, handleClick} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);

    const focusedStyles = {
        boxShadow: '-2px 2px 25px 1px rgba(172, 29, 156, 0.59)',
        border: '1px solid #881CDA'
    }

    const handleFocus = (input) => {
        setFocusedInput(input);
    }
   
    const handleBlur = () => {
        setFocusedInput(null);
    }
    const handleSubmit = async () => {
      await  handleClick(email, password, name);
        setEmail('');
        setPassword('');
        setName('');
    }

    const handleKeyDown = (evt) => {
        if (evt.key === 'Enter') {
            handleSubmit();
        }
    }
 
    return (
        <div className="form">
            {buttonTitle && <h2 style={{alignSelf:'center'}}>{title}</h2>}
            <input 
            type="email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
            style={(focusedInput === 'email') ? focusedStyles :{}}
            onKeyDown={handleKeyDown}
            placeholder="email" />
            <input 
            onFocus={() => handleFocus('password')}
            onBlur={handleBlur}
            type="password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            style={(focusedInput === 'password') ? focusedStyles :{}}
            onKeyDown={handleKeyDown}
            placeholder="password" />

            <button ч onClick={handleSubmit}>{buttonTitle}</button>
        </div>
    )
}


export {Form}