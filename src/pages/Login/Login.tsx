import classNames from 'classnames';
import { IUserLoginBody } from 'interfaces';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loginUser } from 'redux/actions/users';
import styles from './index.module.scss';

type Inputs = IUserLoginBody;
type StateProps = {
  isLoading: boolean;
};

type DispatchProps = {
  onSubmit: (userRegisterBody: IUserLoginBody) => void;
};

type Props = StateProps & DispatchProps;

const Login = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur' });

  return (
    <div className={styles.box}>
      <form className={styles.form}>
        <label className={styles.label}>
          <span>Email</span>
          <input
            type="email"
            autoFocus
            autoComplete="off"
            placeholder="email"
            className={classNames(styles.input, {
              [styles.invalid]: errors.email,
            })}
            {...register('email', {
              required: 'this field is required!',
            })}
          />
          {errors.email && <span className={styles.invalid_text}>{errors.email.message}</span>}
        </label>
        <label className={styles.label}>
          <span>Пароль</span>
          <input
            type="password"
            placeholder="password"
            className={classNames(styles.input, {
              [styles.invalid]: errors.password,
            })}
            {...register('password', {
              required: 'this field is required!',
              minLength: {
                value: 5,
                message: 'minimum 5 characters',
              },
            })}
          />
          {errors.password && (
            <span className={styles.invalid_text}>{errors.password.message || 'Error!'}</span>
          )}
        </label>
        <input
          className={styles.button}
          onClick={handleSubmit(onSubmit)}
          type="submit"
          value="Войти"
        />
      </form>
      <div className={styles.text}>
        <span>Уже есть аккаунт?</span>
        <NavLink className={styles.link} to="/register">
          Войдите
        </NavLink>
      </div>
    </div>
  );
};

const mapStateToProps = () => ({
  isLoading: false,
});

const mapDispatchToProps = {
  onSubmit: loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
