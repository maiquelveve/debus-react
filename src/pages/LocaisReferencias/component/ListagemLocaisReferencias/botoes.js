import React from 'react';
import { Link } from 'react-router-dom';
import { MdModeEdit, MdCancel } from 'react-icons/md';

export const Editar = ({localReferencia}) => {
    return(
        <Link className="btn btn-success mx-1" to={`editar/${localReferencia.id}`}>
            <MdModeEdit size={20} />
        </Link>
    )
}

export const Cancelar = ({localReferencia}) => {
    return(
        <button type="button" className="btn btn-danger mx-1" value={localReferencia.id} >
            <span>
                <MdCancel size={20} />
            </span>
        </button>
    )
}