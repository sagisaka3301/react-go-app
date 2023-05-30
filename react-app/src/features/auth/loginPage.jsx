import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Auth = () => {
    const [inputAuth, setInputAuth] = React.useState({
        id: null,
        name: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    React.useEffect(() => {
        console.log(inputAuth.name);
    }, [inputAuth.name]);

    // Form入力時のハンドラ
    const handleInputName = (e) => {
        setInputAuth({
            ...inputAuth,
            name: e.target.value
        });
    };

    const handleInputEmail = (e) => {
        setInputAuth({
            ...inputAuth,
            email: e.target.value
        });
    };

    const handleInputPass = (e) => {
        setInputAuth({
            ...inputAuth,
            password: e.target.value
        });
    };

    const handleInputPassConfirm = (e) => {
        setInputAuth({
            ...inputAuth,
            passwordConfirm: e.target.value
        });
    };

    return (
        <div>
            <Container fixed maxWidth="md">
                <Link to="/">Topページへ</Link>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {my : 1},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="name"
                        label="ユーザー名"
                        value={inputAuth.name}
                        required
                        fullWidth
                        onChange={handleInputName}
                    />
                    <TextField
                        id="email"
                        label="メールアドレス"
                        type="email"
                        value={inputAuth.email}
                        required
                        fullWidth
                        onChange={handleInputEmail}
                    />
                    <TextField
                        id="password"
                        label="パスワード"
                        type="password"
                        value={inputAuth.password}
                        required
                        fullWidth
                        onChange={handleInputPass}
                    />
                    <TextField
                        id="passwordConfirm"
                        label="パスワード再入力"
                        type="password"
                        value={inputAuth.passwordConfirm}
                        required
                        fullWidth
                        onChange={handleInputPassConfirm}
                        error={inputAuth.passwordConfirm !== inputAuth.password}
                        helperText={inputAuth.passwordConfirm !== inputAuth.password ? "入力されたパスワードと異なっています。" : ""}
                    />
                </Box>
            </Container>
        </div>
    );
};

export default Auth;
