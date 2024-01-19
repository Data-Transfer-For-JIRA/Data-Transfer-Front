import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginProvider, useLoginContext } from './components/Context/LoginProvider';
import LoginPage from './components/Pages/LoginPage';
import MainPage from './components/Pages/MainPage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <LoginProvider>
        <LoginApp />
      </LoginProvider>
    </ThemeProvider>
  )
}

function LoginApp() {
  const navigator = useNavigate();
  const { loginState } = useLoginContext();

  if (!loginState) {
    navigator("/Login")
  }
  useEffect(() => {
    console.log(loginState);
  }, [loginState])
  return (
    (loginState ? <MainPage /> : <LoginPage />)
  )
}

export default App
