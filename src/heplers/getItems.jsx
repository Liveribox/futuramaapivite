
export const getItems = async() => {
  
    const url = "https://futuramaapi.com/api/characters";
    const resp = await fetch(url);
    const { items } = await resp.json();


    const futuramas = items.map(futurama =>({
        id: futurama.id,
        name: futurama.name,
        gender: futurama.gender,
        species: futurama.species,
        image: futurama.image
    }));

    return futuramas;
}
