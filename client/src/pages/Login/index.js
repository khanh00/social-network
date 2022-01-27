import React, { useState } from 'react';

import Logo from '../../components/ui/Logo';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import style from './Login.module.scss';
import * as api from '../../api';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isCheck, setIsCheck] = useState(false);
  const [inputIsValid, setInputIsValid] = useState(false);
  const [error, setError] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsCheck(true);
    if (inputIsValid) {
      try {
        await api.login({ email, password });
        document.location.href = '/';
      } catch (error) {
        setError(error.response.data.data.message);
      }
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Logo />
        <h1 className={style.heading}>Đăng nhập</h1>
        <form className={style.form} onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="khanh@gmail.com"
            isCheck={isCheck}
            checkValue={(isValid) => setInputIsValid(isValid)}
            onChangeValue={(value) => setEmail(value)}
          />
          <div className="p-relative">
            <Input
              type="password"
              placeholder="••••••••"
              isCheck={isCheck}
              checkValue={(isValid) => setInputIsValid(isValid)}
              onChangeValue={(value) => setPassword(value)}
            />
            <a className={style.forgotPassword} href="/login">
              Quên mật khẩu?
            </a>
          </div>
          <Button.Submit>Đăng nhập</Button.Submit>
        </form>
        {error && <p className={style.error}>{error}</p>}
        <p>
          Chưa có tài khoản? <a href="/login">Tạo tài khoản mới</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
