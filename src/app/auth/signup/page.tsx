import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

export default function SignUp() {
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
        name="login"
        placeholder="Почта"
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Повторите пароль"
      />
      <div className={styles.errorContainer}></div>
      <button className={styles.modal__btnSignupEnt}>Зарегистрироваться</button>
    </>
  );
}
