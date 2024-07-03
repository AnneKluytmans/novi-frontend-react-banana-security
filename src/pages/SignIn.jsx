import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import { Link } from 'react-router-dom';
import {useForm} from "react-hook-form";
import InputField from "../components/inputField/InputField";


function SignIn() {
  const { login } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  function handleFormSubmit(data) {
      console.log(data);
      login(data.email);
  }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
          <InputField
              id="email-field"
              type="email"
              name="email"
              label="E-mail:"
              register={register}
           />
          <InputField
              id="password-field"
              type="password"
              name="password"
              label="Wachtwoord:"
              register={register}
          />
          <button
              type="submit"
              className="form-button"
          >
              Inloggen
          </button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;