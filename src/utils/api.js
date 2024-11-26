export const fetchPokemon = async (path) => {
  try {
    const res = await fetch(path);
    const json = await res.json();
    return json;
  } catch (err) {
    console.log(error);
  }
};
