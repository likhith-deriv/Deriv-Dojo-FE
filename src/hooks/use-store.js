import { createContext, useContext } from 'react';

import { RootStore } from 'stores';

const root_store = new RootStore();

const stores = {
    common_store: root_store.common_store,
};

const StoresContext = createContext(stores);

export const useStores = () => useContext(StoresContext);

export const StoreProvider = ({ children }) => (
    <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>
);
