import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import InputField from "../components/inputField/InputField";


function SignUp() {
    const { register, handleSubmit } = useForm();

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const navigate = useNavigate();

    async function handleFormSubmit(data) {
        console.log(data);
        toggleError(false);
        toggleLoading(true);

        try {
            await axios.post('http://localhost:3000/register', {
                email: data.email,
                username: data.username,
                password: data.password
            });
            navigate("/signin")
        }  catch(e) {
            console.error(e);
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
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
            {loading && <h2>Loading...</h2>}
            {error && <h2>Het registreren is niet gelukt. Probeer het opnieuw.</h2>}
          </form>

          <p>Heb je al een account? Je kunt <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;