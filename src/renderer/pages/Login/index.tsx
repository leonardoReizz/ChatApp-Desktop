import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import * as types from 'renderer/types/types';

import Button from 'renderer/components/Buttons/Button';
import ErrorMessage from 'renderer/components/Error/ErrorMessage';
import FormikLogin from 'renderer/utils/Formik/UserLoginSchema';
import InputFormik from 'renderer/components/Inputs/InputFormik';

import sphereGreen from '../../../../assets/images/sphereGreen.png';
import sphereDark from '../../../../assets/images/sphereDark.png';

import styles from './styles.module.sass';
import { UserLogin } from './types';

const Login = (): JSX.Element => {
  const [message, setMessage] = useState<types.Message | undefined>();
  const navigate = useNavigate();

  const onSubmit = (values: UserLogin) => {
    setMessage(undefined);
    window.electron.ipcRenderer.sendMessage('userLogin', values);
  };

  useEffect(() => {
    window.electron.ipcRenderer.on(
      'userLoginResponse',
      (result: types.IPCDefaultResult) => {
        switch (result.status) {
          case 200:
            navigate('/home');
            break;
          case 400:
            if (result.data.msg === 'Invalid email or password') {
              setMessage({ type: 'error', value: 'Email ou senha invalidos' });
            }
            break;
          default:
            setMessage({ type: 'error', value: 'Erro ao realizar login' });
            break;
        }
      }
    );
  }, [navigate]);

  const formikProps = useFormik({
    initialValues: FormikLogin.userLoginInitialValues,
    validationSchema: FormikLogin.userLoginSchema,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <img className={styles.sphereGreen} src={sphereGreen} alt="balls" />
        <img className={styles.sphereDark} src={sphereDark} alt="balls" />

        <div className={styles.loginContent}>
          <h1>Entre</h1>
          {message && <ErrorMessage text={message.value} />}
          <form onSubmit={formikProps.handleSubmit}>
            <InputFormik
              placeholder="Email"
              name="email"
              type="text"
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              errorMessage={
                formikProps.touched.email && formikProps.errors.email
                  ? formikProps.errors.email
                  : undefined
              }
            />
            <InputFormik
              placeholder="Senha"
              name="password"
              type="password"
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              errorMessage={
                formikProps.touched.password && formikProps.errors.password
                  ? formikProps.errors.password
                  : undefined
              }
            />
            <Button type="submit">Entrar</Button>
          </form>
          <span>
            Ainda nao tem uma contra? <Link to="/register"> Cadastre-se </Link>
          </span>
          <Link to="/replacePassword">Esqueceu sua senha?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
