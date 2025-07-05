'use client';
import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { AxiosError } from 'axios';
import { registerUser } from '@/app/services/auth/authApi';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setErrorMessage('');
    if (
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !username.trim()
    ) {
      setErrorMessage('Пожалуйста, заполните все поля.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Пароли не совпадают.');
      return;
    }
    setIsLoading(true);

    try {
      const response = await registerUser({ email, password, username });
      localStorage.setItem('authToken', JSON.stringify(response));
      localStorage.setItem('username', username);

      router.push('/music/main');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setErrorMessage(
            error.response.data.message ||
              'Ошибка регистрации. Пожалуйста, попробуйте позже.',
          );
        } else if (error.request) {
          setErrorMessage('Ошибка сети. Проверьте подключение к интернету.');
        } else {
          setErrorMessage('Неизвестная ошибка.');
        }
      } else {
        setErrorMessage('Произошла непредвиденная ошибка.');
        console.error('An unexpected error occurred:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <Image
            width={140}
            height={21}
            className={styles.logo__modal}
            src="/Image/logo_modal.png"
            alt={'logo'}
          />
        </div>
      </Link>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="username"
        placeholder="Имя пользователя"
        value={username}
        onChange={onChangeUsername}
      />
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Повторите пароль"
        onChange={onChangeConfirmPassword}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        className={styles.modal__btnSignupEnt}
        onClick={onSubmit}
        disabled={isLoading}
      >
        Зарегистрироваться
      </button>
    </>
  );
}
