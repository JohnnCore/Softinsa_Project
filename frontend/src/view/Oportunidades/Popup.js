import React from "react";
import './popup.css'
import { CgClose } from 'react-icons/cg';
import { FiEdit } from 'react-icons/fi';

function Popup(props) {
    const { selectedOpportunity, onClose } = props;
    console.log(props)

    return (
        <div className="popup" onClick={onClose}>
            <div className="popup-inner big-text" onClick={(e) => e.stopPropagation()}>
            <div key={selectedOpportunity.id} className="col-lg-4 teste">
                    <div className="card popup-card card-margin">
                    <button className="close-btn" onClick={onClose}><CgClose color="black"/></button>
                        <div className="card-header no-border">
                            <h4 className="card-title mt-3">{selectedOpportunity.titulo}</h4>
                            <h6 style={{fontSize: '20px'}}>criada por: {selectedOpportunity.user.primeiro_nome} {selectedOpportunity.user.ultimo_nome} ({selectedOpportunity.data_criacao.slice(0,10)})</h6> 
                        </div>
                        <div className="card-body pt-0">
                            <div className="widget-49">
                                <div className="widget-49-meeting-points mt-3 ml-5">
                                    <div>
                                        <strong>Nome da Empresa</strong>
                                        <p>{selectedOpportunity.empresa}</p>
                                    </div>
                                    <div style={{paddingRight: '40px'}}>
                                        <strong>Estado</strong>
                                        <p style={{width: '160px'}}>{selectedOpportunity.estadosoportunidade.estado}</p>
                                       
                                    </div>
                                </div>
                                <div className="widget-49-meeting-points mt-2">
                                    <div >
                                        <strong>Tipo de Projeto</strong>
                                        <p>{selectedOpportunity.tiposdeprojeto.tipo}</p>
                                    </div>
                                    <div style={{paddingRight: '50px'}}>
                                        <strong>Área de Negócio</strong>
                                        <p>{selectedOpportunity.areasdenegocio.area}</p>
                                        
                                    </div>
                                </div>
                                <div className="widget-49-meeting-points mt-2">
                                    <div>
                                        <strong>Necessidades</strong>
                                        <p>{selectedOpportunity.necessidades}</p>
                                    </div>
                                </div>
                                <div className="widget-49-meeting-action">
                                    <h6>Data de Atualização: {selectedOpportunity.data_atualizacao.slice(0,10)}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    );
}
export default Popup