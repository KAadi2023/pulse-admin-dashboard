import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    const [authToken, setAuthToken] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (token) {
            setIsAuthenticated(true);
        }
    }, [])

    // navigate on signing page if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            <Navigate
                to={{ pathname: "admin/sign-in" }}
                replace={true} />
        }
    }, [isAuthenticated])

    const login = async (secretKey) => {
        try {
            const response = await axios.post(
                `${apiEndpoint}/api/v1/admin/verify`,
                { secretKey },
                { withCredentials: true }
            );

            const result = response.data;
            console.log('result', result);

            if (response.status !== 200) {
                return { success: false, message: result.message };
            }

            if (result.success) {
                setAuthToken(result.token)
                localStorage.setItem(
                    "authToken",
                    result.token,
                    { expires: new Date(result.tokenExpirationDate) }
                )
            }
            return result;
        } catch (error) {
            console.log("Network Error: ", error);
            return { success: false, message: error.response?.data?.message || error.message };
        }
    };

    const logout = async () => {
        try {
            const response = await axios.get(`${apiEndpoint}/api/v1/admin/logout`, {
                withCredentials: true
            });

            const result = response.data;

            if (response.status !== 200) {
                console.error("Error Response: ", result);
                return { success: false, message: result.message };
            }

            if (result.success) {
                setIsAuthenticated(false);
            }
            return result;
        } catch (error) {
            console.error("Network Error: ", error);
            return { success: false, message: error.response?.data?.message || error.message };
        }
    };

    console.log("token", authToken)

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }
    return context;
};
