import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import InputField from "../components/inputField/InputField";


function SignIn() {
    const { register, handleSubmit } = useForm();

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const { login } = useContext(AuthContext);

    const source = axios.CancelToken.source();

    useEffect(() => {
        return function cleanup() {
            source.cancel();
        }
    }, []);

    async function handleFormSubmit(data) {
        console.log(data);
        toggleError(false);
        toggleLoading(true);

        try {
            const result = await axios.post('http://localhost:3000/login', {
                email: data.email,
                password: data.password
            }, {
                cancelToken: source.token,
            });
            console.log(result.data);
            login(result.data.accessToken);
        } catch(e) {
            console.error(e);
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
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
          {loading && <h2>Loading...</h2>}
          {error && <h2>Het registreren is niet gelukt. Probeer het opnieuw.</h2>}
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;