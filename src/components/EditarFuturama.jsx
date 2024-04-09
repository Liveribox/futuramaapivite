import { useState } from "react";
import { Modal , Input } from "antd";


export const EditarFuturama = ({id ,name,gender,specie,image,editItem,setOpenForm2}) => {

    const [inputName, setInputName] = useState('');
    const [inputGender, setInputGender] = useState('');
    const [inputSpecies, setInputSpecies] = useState('');
    const [inputImagen, setinputImagen] = useState('');


    
    const EditItem = () => {
        const Item = {
            id: id,
            name: inputName,
            gender: inputGender,
            species: inputSpecies,
            image: inputImagen
        }

        editItem(Item)
    }

    const editar = () => {
        EditItem()
        setOpenForm2(false);
    }

    const aparecerModal = () => {
        setOpenForm2(true)
    }

    const esconderModal = () => {
        setOpenForm2(false)
    };

    
    return(

        <Modal
        className="modal"
        title="Editar"
        open={aparecerModal}
        onOk={editar}
        onCancel={esconderModal}
        okText="Editar"
        cancelText="Cancelar"
      >
        <Input className="inputEdit" placeholder={name} id="name" value={inputName} onChange={(e) => setInputName(e.target.value)}/>
        <br/>
        <br/>
        <Input className="inputEdit" placeholder={gender} id="genero" value={inputGender} onChange={(e) => setInputGender(e.target.value)}/>
        <br/>
        <br/>
        <Input className="inputEdit" placeholder={specie} id="specie" value={inputSpecies} onChange={(e) => setInputSpecies(e.target.value)}/>
        <br/>
        <br/>
        <Input className="inputEdit" placeholder={image} id="image" value={inputImagen} onChange={(e) => setinputImagen(e.target.value)}/>
        
      </Modal>

    )
}