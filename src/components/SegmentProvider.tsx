import { createContext, useState } from 'react';

type SegmentProviderState = {
  name: string;
  type: string;
  setTheme: (theme: Theme) => void
}

const initialState: SegmentProviderState = {
  name: '',
  type: '',
  setTheme: () => null,
}

const SegmentContext = createContext<SegmentProviderState>(initialState)

export const SegmentProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [user, setUser] = useState({
    name: 'Jane Doe',
    status: 1, // 1 -> loggedIn, 0 -> loggedOut
  });

  const logout = () => {
    setUser({ name: '', status: 0 });
  };

  return (
    <SegmentContext value={{ user, logout }}>
      {children}
    </SegmentContext>
  );
};