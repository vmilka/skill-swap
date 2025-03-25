import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import styles from './registerPage.module.css';
import * as skillAppi from "../../services/api-service";
import { useAuthContext } from "../../contexts/auth-context";

function RegisterPage() {

  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleRegister = async (user) => {
    try {

      await skillAppi.register(user);
      user = await skillAppi.login(user);
      login(user);
      navigate("/home");

    } catch (error) {
      const { data } = error.response;

      Object.keys(data.errors).forEach((inputName) =>
        setError(inputName, { message: data.errors[inputName] })
      );
    }
  };
  return (
    <div className={styles.registerContainer} >
      <div className={styles.registerBox} >
        <h2 className={styles.registerTitle}>
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="mb-3">
            <label className="form-label">Nombre y Apellido</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Nombre de usuario"
              {...register("name", { required: "Mandatory field" })}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Ciudad</label>
            <input
              type="text"
              placeholder="Ciudad"
              className={`form-control ${errors.city ? "is-invalid" : ""}`}
              {...register("city", { required: "Mandatory field" })}
            />
            {errors.city && (
              <div className="invalid-feedback">{errors.city.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              placeholder="Correo electrónico"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", { required: "Mandatory field" })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password", { required: "Mandatory field" })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Crear cuenta
          </button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          ¿Ya tienes una cuenta?{' '}
          <span
            className={styles.loginLink}
            onClick={() => navigate('/')}
          >
            Inicia sesión aquí
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
