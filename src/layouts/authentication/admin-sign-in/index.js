

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import { useAuth } from "context/authContext";

// Image
const bgImage =
    "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg";

function AdminSignIn() {
    const [rememberMe, setRememberMe] = useState(false);
    const [secretKey, setSecretKey] = useState("");

    const handleSetRememberMe = () => setRememberMe(!rememberMe);
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            await login(secretKey)
        } catch (error) {
            console.error(error);
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    }

    return (
        <IllustrationLayout
            title="Admin Sign In"
            description="Enter Secret Key to sign in"
            illustration={{
                image: bgImage,
                title: '"Stay Connect with your loved one"',
                description:
                    "The more effortless the writing looks, the more effort the writer actually put into the process.",
            }}
        >
            <ArgonBox component="form" role="form">
                <ArgonBox mb={2}>
                    <ArgonInput
                        type="password"
                        placeholder="Password"
                        size="large"
                        onChange={e => {
                            setSecretKey(e.target.value);
                            handleKeyPress(e);
                        }}
                    />
                </ArgonBox>
                <ArgonBox display="flex" alignItems="center">
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <ArgonTypography
                        variant="button"
                        fontWeight="regular"
                        onClick={handleSetRememberMe}
                        sx={{ cursor: "pointer", userSelect: "none" }}
                    >
                        &nbsp;&nbsp;Remember me
                    </ArgonTypography>
                </ArgonBox>
                <ArgonBox mt={4} mb={1}>
                    <ArgonButton color="info" size="large" fullWidth onClick={handleLogin}>
                        Sign In
                    </ArgonButton>
                </ArgonBox>
            </ArgonBox>
        </IllustrationLayout>
    );
}

export default AdminSignIn;
