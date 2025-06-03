import React, {useState, useContext} from "react";
import { AuthContext } from "../contexts/AuthContext";
import './LoginForm.css';

const LoginForm= () => {
    const {login} = useContext(AuthContext);
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(account, password, rememberMe); //登入
    };

    return(
        <form className="login-from" onSubmit = {handleSubmit}>
        <div className="form-group">
        <label htmlFor="account">帳號:</label>
        <input
        type="text"
        id="account"
        value={account}
        onChange={(e) => setAccount(e.target.value)} />
        </div>

        <div className="form-group">
        <label htmlFor="password">密碼:</label>
        <input 
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
        </div>
        
        <div className="checkbox-row">
            <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)} />
        <label htmlFor="rememberMe">保持登入</label>
        </div>

        <button type="sumbit">登入</button>
    
        </form>
    )
}

export default LoginForm;