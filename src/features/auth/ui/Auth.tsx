import * as React from "react";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {ChangeEvent, useState} from "react";
import {SelectChangeEvent} from "@mui/material";

const Auth = () => {
    const [inputData, setInputData] = useState({
        email: "",
        password: "",
    });
    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement
        | HTMLTextAreaElement> | SelectChangeEvent) => {
        setInputData(prev => ({...prev, [e.target.name]: e.target.value}));
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    return (
        <Container component="div" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1, width: "300px"}}>
                    <div style={{height: 95}}>
                        <TextField
                            onChange={inputChangeHandler}
                            value={inputData.email}
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            error={!inputData.email}
                            type={"email"}
                        />
                    </div>
                    <div style={{height: 95}}>
                        <TextField
                            onChange={inputChangeHandler}
                            value={inputData.password}
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={!inputData.password}
                        />
                    </div>
                    <LoadingButton
                        loading={false}
                        loadingIndicator="Загрузка…"
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}

                    >
                        {"Войти"}
                    </LoadingButton>
                </Box>
            </Box>
        </Container>
    );
};

export default Auth;
