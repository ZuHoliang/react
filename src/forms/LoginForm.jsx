import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "./LoginForm.css";

const LoginForm = () => {
  const { login, loading } = useContext(AuthContext);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [accountError, setAccountError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setAccountError("");
    setPasswordError("");

    if (!account || !password) {
      setMessage("請輸入帳號和密碼");
      return;
    }

    const result = await login(account, password, rememberMe); //登入
    if (!result.success) {
      const msg = result.message || "";
      if (msg.includes("帳號錯誤")) {
        setAccountError("*查無使用者");
      } else if (msg.includes("密碼錯誤")) {
        setPasswordError("*密碼錯誤");
      } else {
        setMessage(msg);
      }
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {message && (
        <div
          className={`message ${
            message.includes("成功") ? "success" : "error"
          }`}
        >
          {message}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="account">
          帳號:{""}
          {accountError && <span className="field-error">{accountError}</span>}
        </label>
        <input
          type="text"
          id="account"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">
          密碼:{""}
          {passwordError && (
            <span className="field-error">{passwordError}</span>
          )}
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="checkbox-row">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          disabled={loading}
        />
        <label htmlFor="rememberMe">保持登入</label>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "登入中..." : "登入"}
      </button>
    </form>
  );
};

export default LoginForm;
