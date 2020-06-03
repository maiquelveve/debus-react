import React from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useHistory } from 'react-router-dom';

export default function SimpleDialog(props) {
    const { open, setOpen, link } = props;
    const history = useHistory();
    const handleClose = () => {
        setOpen(false);
    };

    const handleLinkAdicionar = () => {
        history.push(link.adicionar);
    }

    const handleLinkEditar = () => {
        history.push(link.editar);
    }

    const handleLinkRemover = () => {
        history.push(link.remover);
    }
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Selecione a opção desejada:</DialogTitle>
        <List>
            <ListItem button > {/*onClick={() => handleListItemClick(email)} > */}
              <Button onClick={handleLinkAdicionar} >Adicionar</Button> {/* link ou depois do click redireciona para a pagina certa */}
              <Button onClick={handleLinkEditar} >Editar</Button> {/* link ou depois do click redireciona para a pagina certa */}
              <Button onClick={handleLinkRemover} >Remover</Button> {/* link ou depois do click redireciona para a pagina certa */}
            </ListItem>
          <ListItem autoFocus button >{/*onClick={() => handleListItemClick('addAccount')}> */}
          </ListItem>
        </List>
      </Dialog>
    );
}


//Admin
// import React from 'react'

// import api from '../../services/api'
// import logoImg from '../../assets/logo.svg'
// import SimpleDialog from '../../components/Dialog/Dialog'

// export default function Admin() {
//     const [open, setopen] = useState(false)
//     const [link, setLink] = useState({})

//     const handleClickProdutos = () => {
//         setOpen(true)
//         setLink({
//             adicionar: '/newProduct',
//             editar: '/',
//             remover: '/'
//         })
//     }

//     const handleClickMercado = () => {
//         setOpen(true)
//         setLink({
//             adicionar: '/newMarket',
//             editar: '/',
//             remover: '/'
//         })
//     }

//     const handleClickReciclagem = () => {
//         setOpen(true)
//         setLink({
//             adicionar: '/newReciclagem',
//             editar: '/',
//             remover: '/'
//         })
//     }

//     return(
//         <div className="admin-content">
//             <div>
//                 <button className="button" onClick={handleClickProdutos} > Produtos </button>
//                 <button className="button" onClick={handleClickReciclagem} >Reciclagem</button>
//                 <button className="button" onClick={handleClickMercado} >Mercado</button>
//             </div>

//             <SimpleDialog open={open} setOpen={setOpen} link={link} />
//         </div>
//     )
// }