import { useFetchFuturamas } from "../hooks/useFetchFuturama"
import { useState , useEffect } from "react";
import { CrearFuturama } from "./CrearFuturama";
import { EditarFuturama } from "./EditarFuturama";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { BackTop , Image , Input } from "antd";
import { useLocation } from "react-router-dom"


export const FuturamaGrid = () => {
  
    const {futuramas, setFuturamas} = useFetchFuturamas()

    const [OpenForm, setOpenForm] = useState(false)
    const [OpenForm2, setOpenForm2] = useState(false)

    //Variables para pasarles el valor a EditFuturama
    const [Iddato, setIddato] = useState('')
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [specie, setSpecie] = useState('')
    const [image, setImage] = useState('')

    //Variable para filtrar personaje
    const [filtro, setFiltro] = useState('')

    //Variable para mostrar personajes filtrados
    const [personajesFiltrados , setPersonajesFiltrados] = useState([]);

    //Comprueba en que pagina de la DataTable estás
    const [paginaActual, setPaginaActual] = useState(1);

    //const [permisoConcedido, setPermisoConcedido] = useState(false);

    let permisoLocation = useLocation().state?.dataPermiso;

    //Te permite navegar entre pantallas
    const navegar = useNavigate();

    //Funciones para filtrar personajes
    const filtrarPersonajes = (e) => {
        const valor = e.target.value;
        setFiltro(valor)
    };

    useEffect(() => {
        console.log("Permiso pasado valor " + permisoLocation);

        if(permisoLocation === false || permisoLocation === undefined){
            navegar("/");
        }

        const tiempoDeCarga = setTimeout(() => {

            if (filtro.length >= 3) {
                const filtrados = futuramas.filter(futurama =>
                    futurama.name.toLowerCase().includes(filtro.toLowerCase())
                );
                setPersonajesFiltrados(filtrados);
            } else {
                setPersonajesFiltrados(futuramas);
            }
            
        }, 1000);
        
        return () => clearTimeout(tiempoDeCarga);

    }, [filtro, futuramas]);
    
    
    //Funcion para añadir personajes
    const addItem = (newItem) => {
        setFuturamas([...futuramas , newItem])
    }

    //Funcion para editar personajes
    const editItem = (editItem) => {
        const updateItems = futuramas.map(futurama => {
            if(futurama.id === editItem.id ){
                return {
                    ...futurama,
                    name: editItem.name,
                    gender: editItem.gender,
                    species: editItem.species,
                    image: editItem.image
                }    
            }
            return futurama;

        });
        setFuturamas(updateItems); 
    }

    //Funcion para borrar personajes
    const deleteItem = (deleteItem) => {
        const deletedItems = futuramas.filter(futurama => futurama.id !== deleteItem);
        setFuturamas(deletedItems);
    }

    const columns = [
        {
          name: 'Nombre',
          selector: row => row.name,
        },
        {
          name: 'Genero',
          selector: row => row.gender
        },
        {
          name: 'Especie',
          selector: row => row.species, 
        },
        {
          name: "Imagen",
          selector: row => <Image id="imageDataTable" src={row.image} alt={row.name}/>,
        },
        {
            name: "Editar",
            selector: row => <button className="botonEditar" onClick={() =>{setOpenForm2(true) ; setIddato(row.id) ; setName(row.name) ; setGender(row.gender) ; setSpecie(row.species) ; setImage(row.image)}}>Editar</button>
        },
        {
            name: "Eliminar",
            selector: row => <button className="botonEliminar" onClick={() =>{deleteItem(row.id)}}>Eliminar</button>
        },
        {
            name: "Detalles",
            selector: row => <button className="botonDetalles" onClick={() => {navegar("/detallesFutu",{state: {data: row.id}})}}>Detalles</button>
        }
      ];

      const cambiarPagina = pagina => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setPaginaActual(pagina);
      };

    return(
        <div className="card-grid">
            <button className="botonCrear" onClick={() =>{setOpenForm(true);}}>Crear</button>
            <button className="botonSalir" onClick={() => {navegar('/'); permisoLocation = false}}>Salir</button>

            {OpenForm && <CrearFuturama addItem={addItem} newId={futuramas.length} setOpenForm={setOpenForm}/>}
            {OpenForm2 && <EditarFuturama id={Iddato} name={name} gender={gender}  specie={specie} image={image} editItem={editItem} setOpenForm2={setOpenForm2}/>}

            <Input className="inputBuscadorPersonajes" placeholder="Buscar personajes" value={filtro} onChange={filtrarPersonajes}></Input>

            <DataTable
                className="datatable"
                columns={columns}
                data={personajesFiltrados}
                highlightOnHover
                showGridlines
                responsive
                pagination
                paginationDefaultPage={paginaActual}
                onChangePage={cambiarPagina}
                noDataComponent="No se ha encontrado ningún personaje 🙄"         
            />

            <BackTop>
            </BackTop>            
        {
            /*futuramas.map( (futurama) => (

                <FuturamaItem
                    key={futurama.id}
                    {...futurama}
                    //editItem={editItem}
                    //deleteItem={deleteItem}
                />

            ))*/
        }
            
        </div>

        
    )

}


