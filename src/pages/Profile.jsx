import { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Profile() {
    const [userData, setUserData] = useState(undefined);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    const {user} = useContext(AuthContext);

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchUserData() {
            const token = localStorage.getItem('token');
            toggleError(false);
            toggleLoading(true);

            try {
                const response = await axios.get('http://localhost:3000/660/private-content', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    cancelToken: source.token,
                });
                setUserData(response.data);
            } catch (e) {
                console.error(e);
                toggleError(true);
            } finally {
                toggleLoading(false);
            }
        }

        void fetchUserData();

        return function cleanup() {
            source.cancel();
        }
    }, [])

    return (
        <>
          <h1>Profielpagina</h1>
          <section>
            <h2>Gegevens</h2>
            <p><strong>Gebruikersnaam:</strong>{user.username}</p>
            <p><strong>Email:</strong>{user.email}</p>
          </section>
          <section>
            <h2>Strikt geheime profiel-content</h2>
              {userData &&
                  <section>
                      <h3>{userData.title}</h3>
                      <p>{userData.content}</p>
                  </section>
              }
              {loading && <h2>Loading...</h2>}
              {error && <h2>Het ophalen van de gegevens is niet gelukt. Probeer het opnieuw.</h2>}
          </section>
          <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;