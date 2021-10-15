import { createContext, FunctionComponent } from "react";
import axios from "axios";
type SquareType = "X" | "O" | null;

interface User {
  user_id?: number;
  state?: SquareType[];
  authReady?: boolean;
}

const AuthContext = createContext<User>({
  user_id: undefined,
  state: [],
});

export const AuthContextProvider = ({ children }: any) => {
  const getState = async () => {
    
  }
  return (
    <AuthContext.Provider value={{ user_id: 1, state: ["X"] }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
