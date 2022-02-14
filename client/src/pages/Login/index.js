import React, { useState } from 'react';

import * as api from '../../api';
import { useAuth } from '../../contexts/authContext';
import Logo from '../../components/ui/Logo';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import style from './Login.module.scss';

function Login() {
  const [input, setInput] = useState({ email: '', password: '' });
  const [isCheck, setIsCheck] = useState(false);
  const [inputIsValid, setInputIsValid] = useState(false);
  const [error, setError] = useState();
  const auth = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsCheck(true);
    if (!inputIsValid) return;

    const { data, error } = await api.login(input);
    if (error) return setError(error.message);

    auth.login(data.user._id);
    document.location.href = '/';
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
            onChangeValue={(value) => setInput({ ...input, email: value })}
          />
          <div className="p-relative">
            <Input
              type="password"
              placeholder="••••••••"
              isCheck={isCheck}
              checkValue={(isValid) => setInputIsValid(isValid)}
              onChangeValue={(value) => setInput({ ...input, password: value })}
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
