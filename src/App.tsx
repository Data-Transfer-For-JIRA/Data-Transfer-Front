import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginProvider, useLoginContext } from './components/Context/LoginProvider';
import LoginPage from './components/Pages/LoginPage';
import MainPage from './components/Pages/MainPage';


function App() {
  return (
    <LoginProvider>
      <LoginApp />
    </LoginProvider>
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
