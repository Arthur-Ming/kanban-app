import styles from './index.module.scss';

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => (
  <main className={styles.wrapper}>
    <div className={styles.box}>{children}</div>
  </main>
);

export default AuthLayout;
