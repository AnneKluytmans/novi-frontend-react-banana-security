import {Link, useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputField from "../components/inputField/InputField";

function SignUp() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  function handleFormSubmit(data) {
      console.log(data);
      navigate("/signin")
  }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField
            id="email-field"
            type="email"
            name="email"
            label="E-mail:"
            register={register}
        />
        <InputField
            id="username-field"
            type="text"
            name="username"
            label="Gebruikersnaam:"
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
            Maak een account aan
        </button>
      </form>

      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;