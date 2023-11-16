import { useState } from "react";

function Form(props) {
    const {title, handleClick} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
   
    const handleSubmit = async () => {
      await  handleClick(email, password, name);
        setEmail('');
        setPassword('');
        setName('');
    }
 
    return (
        <div className="form">
            <input 
            type="email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            placeholder="email" />
            <input 
            type="password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            placeholder="password" />

            <button onClick={handleSubmit}>{title}</button>
        </div>
    )
}


export {Form}