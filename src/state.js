import { createGlobalState } from 'react-hooks-global-state';

const { GlobalStateProvider, setGlobalState, useGlobalState } = createGlobalState({
    usuario: {},
});

export const setUsuario = (u) => {
    setGlobalState('usuario', u);
};

export { GlobalStateProvider, useGlobalState };