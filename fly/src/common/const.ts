export const staging = import.meta.env.VITE_STAGING;

export const isDev = staging === 'dev';

export const isTest = staging === 'test';

export const basename = staging === 'dev' ? '/' : '/';