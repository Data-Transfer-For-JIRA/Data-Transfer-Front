import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import createTheme from "@mui/material/styles/createTheme";
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
  return (
    (loginState ? <MainPage /> : <LoginPage />)
  )
}

export default App
