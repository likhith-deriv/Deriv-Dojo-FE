import { createContext, useContext } from 'react';

const stores = {};

const StoresContext = createContext(stores);

export const useStores = () => useContext(StoresContext);

export const StoreProvider = ({ children }) => (
    <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>
);
