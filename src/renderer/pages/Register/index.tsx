import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

import * as types from 'renderer/types/types';

import ErrorMessage from 'renderer/components/Error/ErrorMessage';
import Button from 'renderer/components/Buttons/Button';
import InputFormik from 'renderer/components/Inputs/InputFormik';
import formikRegister from '../../utils/Formik/UserRegisterSchema';

import { UserRegister } from './types';

import sphereGreen from '../../../../assets/images/sphereGreen.png';
import sphereDark from '../../../../assets/images/sphereDark.png';

import styles from './styles.module.sass';

const Register = (): JSX.Element => {
  const [message, setMessage] = useState<types.Message | undefined>();

  const onSubmit = (values: UserRegister) => {
    setMessage(undefined);
    window.electron.ipcRenderer.sendMessage('userRegister', values);
  };

  useEffect(() => {
    window.electron.ipcRenderer.on(
      'userRegisterResponse',
      (result: types.IPCDefaultResult) => {
        if (result.status !== 200) {
          if (result.data.msg === 'Email already exist') {
            setMessage({
              type: 'error',
              value: 'Este email já esta cadastrado',
            });
          } else {
            setMessage({
              type: 'error',
              value: 'Erro ao registrar usuario.',
            });
          }
        }
      }
    );
  }, []);

  const formikProps = useFormik({
    initialValues: formikRegister.UserRegisterInitialValues,
    validationSchema: formikRegister.UserRegisterSchema,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <div className={styles.register}>
      <div className={styles.registerContainer}>
        <img className={styles.sphereGreen} src={sphereGreen} alt="balls" />
        <img className={styles.sphereDark} src={sphereDark} alt="balls" />

        <div className={styles.registerContent}>
          <h1>Cadastre-se</h1>
          {message && <ErrorMessage text={message.type} />}
          <form onSubmit={formikProps.handleSubmit}>
            <InputFormik
              placeholder="Nome Completo"
              name="fullName"
              type="text"
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              errorMessage={
                formikProps.touched.fullName && formikProps.errors.fullName
                  ? formikProps.errors.fullName
                  : undefined
              }
            />
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
            <InputFormik
              placeholder="Confirme a senha"
              name="confirmPassword"
              type="password"
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              errorMessage={
                formikProps.touched.confirmPassword &&
                formikProps.errors.confirmPassword
                  ? formikProps.errors.confirmPassword
                  : undefined
              }
            />
            <Button type="submit">Cadastrar</Button>
          </form>
          <span>
            Já possui uma conta? <Link to="/"> Entre </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
