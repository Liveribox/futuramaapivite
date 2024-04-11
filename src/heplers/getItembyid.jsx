
export const getItembyid = async(id_futu) => {
  
    const url = `https://futuramaapi.com/api/characters/${id_futu}`;
    const resp = await fetch(url);
    const { id , name , gender, species, image } = await resp.json();


    const futuramas ={
        id: id,
        name: name,
        gender: gender,
        species: species,
        image: image
    };

    console.log(futuramas);

    return futuramas;
}
