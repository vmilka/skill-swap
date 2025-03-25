import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import cardskill from '../../assets/img-login.jpg';
import styles from './loginPage.module.css';
import * as skillAppi from "../../services/api-service";
import { useAuthContext } from "../../contexts/auth-context";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleLogin = async (user) => {
    try {
      user = await skillAppi.login(user)
      login(user);
      navigate('/home');
    } catch (error) {

      if (error.response?.status === 401) {
        const { data } = error.response;

        Object.keys(data.errors).forEach((inputName) =>
          setError(inputName, { message: data.errors[inputName] })
        );
      } else {
        console.error(error);
      }
    }
  };


  return (
    <div className={styles.loginContainer}>

    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(handleLogin)} data-testid="login-form">
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            className={`${styles.inputField} form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Correo electrónico"
            required
              {...register("email", { required: "Mandatory field" })}
          />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
              className={`${styles.inputField} form-control ${errors.password ? "is-invalid" : ""} `}

            placeholder="Contraseña"
              data-testid="password-input"
              {...register("password", { required: "Mandatory field" })}
          />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
        </div>
        <button type="submit" className={styles.submitButton}>
          Ingresar
        </button>
      </form>
      <p style={{ marginTop: '10px' }}>
        ¿No tienes una cuenta?{' '}
        <span onClick={() => navigate('/register')} className={styles.registerLink}>
          Regístrate aquí
        </span>
      </p>
    </div>

    <div className={styles.imageContainer}>
      <img
        src={cardskill} 
        alt="Imagen de inicio de sesión"
      />
    </div>
  </div>
);
}

export default LoginPage;
