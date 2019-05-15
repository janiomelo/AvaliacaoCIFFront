import { createGlobalState } from 'react-hooks-global-state';

const { GlobalStateProvider, setGlobalState, useGlobalState } = createGlobalState({
    usuario: {},
    fontesInformacao: []
});

export const setUsuario = (u) => {
    setGlobalState('usuario', u);
};

export const setFontesInformacao = (f) => {
    setGlobalState('fontesInformacao', f);
};

export { GlobalStateProvider, useGlobalState };