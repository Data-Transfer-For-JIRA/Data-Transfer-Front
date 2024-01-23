import { createContext, ReactNode, useContext, useState } from 'react'

interface LoginContextType {
  loginState: boolean,
  switchLogin: (flag: boolean) => void
}

type LoginProviderType = { children: ReactNode; }

const LoginContext = createContext<LoginContextType>({ loginState: true, switchLogin: () => { } });

export function LoginProvider({ children }: LoginProviderType) {
  const [loginState, setLoginState] = useState(true);

  const switchLogin = (flag: boolean) => {
    console.log('in provider');
    setLoginState(flag);
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
