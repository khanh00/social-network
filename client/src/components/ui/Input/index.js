import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { MdErrorOutline } from 'react-icons/md';

import { validator } from '../../../constants';
import style from './Input.module.scss';

const { isEmail, isPassword } = validator;

function Input({ type, placeholder, isCheck, checkValue, onChangeValue }) {
  const name = useMemo(() => (type === 'email' ? 'Email' : 'Mật khẩu'), [type]);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isCheck) {
      if (!value) setError(`${name} không được để trống`);
      else if (type === 'email' && !isEmail.test(value)) {
        setError('Email không hợp lệ');
      } else if (type === 'password' && !isPassword.test(value)) {
        setError('Mật khẩu phải chứa ít nhất 8 kí tự');
      } else {
        setError();
      }
    }
  }, [name, value, type, isCheck]);

  useEffect(() => {
    checkValue(error === undefined);
  }, [error, checkValue]);

  const handleChangeValue = (event) => {
    setValue(event.target.value);
    onChangeValue(event.target.value);
  };

  return (
    <div>
      <label className={clsx(style.wrapper, { [style.error]: error })}>
        <span>{name}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChangeValue}
        />
      </label>
      {error && (
        <div className={style.errorMessage}>
          <div className={style.icon}>
            <MdErrorOutline />
          </div>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  isCheck: PropTypes.bool,
  checkValue: PropTypes.func,
  onChangeValue: PropTypes.func,
};

export default Input;
