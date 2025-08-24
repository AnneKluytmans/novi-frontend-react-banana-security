import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import isTokenValid from "../helpers/isTokenValid";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [isAuth, setIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token && isTokenValid(token)) {
            void login(token);
        } else {
            setIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    const navigate = useNavigate();

    async function login( JWT ) {
        console.log(JWT);
        localStorage.setItem('token', JWT);
        const decodedToken = jwtDecode(JWT);
        console.log(decodedToken);

        try {
            const response = await axios.get(`http://localhost:3000/600/users/${decodedToken.sub}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JWT}`,
                }
            });
            console.log(response);
            console.log('Gebruiker is ingelogd!');

            setIsAuth({
                isAuth: true,
                user: {
                    email: response.data.email,
                    username: response.data.username,
                    id: response.data.id,
                },
                status: 'done',
            });

            navigate('/profile');
        } catch(e) {
            console.error(e);
            setIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    function logout() {
        console.log('De gebruiker is uitgelogd!');
        localStorage.clear();
        setIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
        navigate('/');
    }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            { isAuth.status === 'done' ? children : <p>Loading...</p> }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;