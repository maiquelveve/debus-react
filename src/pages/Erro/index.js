import React from 'react';
// import { useParams } from 'react-router-dom'
// console.log(useParams()[0]);
export default function Erro() {
  return (
   <div>
       <h2>Ops! pagina não encontrada</h2><br/>
      <h3>Vocês esta procurando por: {window.location.href} </h3><br/>
   </div>
 );
}