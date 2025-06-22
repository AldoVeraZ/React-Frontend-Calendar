export const getEnvVariables = () => {
  import.meta.env;

  return {
    // esparcimos las variables de entorno
    ...import.meta.env,
  };
};
