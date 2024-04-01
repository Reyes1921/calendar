export const getVenVariables = () => {
  import.meta.env

  return {
    ...import.meta.env,
  }
}
