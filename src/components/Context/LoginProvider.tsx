import { createContext, ReactNode, useContext, useState } from 'react'

interface LoginContextType {
  loginState: boolean,
  switchLogin: () => void
}

type LoginProviderType = { children: ReactNode; }

const LoginContext = createContext<LoginContextType>({ loginState: false, switchLogin: () => { } });

export function LoginProvider({ children }: LoginProviderType) {
  const [loginState, setLoginState] = useState(false);

  const switchLogin = () => {
    console.log('in provider');
    setLoginState((prev) => !prev);
  }
  const LoginProviderValue: LoginContextType = { loginState, switchLogin };

  return (
    <LoginContext.Provider value={LoginProviderValue}>
      {children}
    </LoginContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginContext = (): LoginContextType => {
  const context = useContext(LoginContext);
  return context;
}
