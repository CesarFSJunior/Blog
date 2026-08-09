'use client';
import { createContext, useState, useContext, ReactNode } from 'react';

const EstadoContext = createContext();

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
  return useContext(EstadoContext);
}
