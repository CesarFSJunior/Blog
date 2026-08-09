'use client';
import { createContext, useState, useContext, ReactNode } from 'react';

interface EstadoContextType {
  valor: boolean;
  setValor: React.Dispatch<React.SetStateAction<boolean>>;
}

const EstadoContext = createContext<EstadoContextType | undefined>(undefined);

export function EstadoProvider({ children } : {children: ReactNode}) {
  const [valor, setValor] = useState(false);

  return (
    <EstadoContext.Provider value={{ valor, setValor }}>
      {children}
    </EstadoContext.Provider>
  );
}

// Hook personalizado para facilitar o uso depois
export function useEstadoGlobal() {
  const context = useContext(EstadoContext);
  if (!context) {
    throw new Error('useEstadoGlobal deve ser usado dentro de um EstadoProvider')
  }
  return context;
}
