'use client';
import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { authUser } from '@/app/services/auth/authApi';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (router) {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        router.push('/music/main');
      }
    }
  }, [router]);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Complete validation');
      return;
    }
    setisLoading(true);
    authUser({ email, password })
      .then((userData) => {
        localStorage.setItem('authToken', JSON.stringify(userData));

        if (router) {
          router.push('/music/main');
        } else {
          console.error('Router is null');
        }
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            setErrorMessage(' Network error,try again');
          } else {
            setErrorMessage('Unknown error');
          }
        }
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <a href="/music/main">
        <div className={styles.modal__logo}>
          <Image
            width={140}
            height={21}
            className={styles.logo__modal}
            src="/Image/logo_modal.png"
            alt={'logo'}
          />
        </div>
      </a>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnEnter}
      >
        Войти
      </button>
      <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
