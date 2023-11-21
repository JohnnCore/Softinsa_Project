import React, { useEffect, useState } from 'react';
import './Popup.css';
import authHeader from "../auth.header";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Popup(props) {
    const navigate = useNavigate();
    const { selectedOfertavaga, onClose } = props;
    console.log(props);

    const handleClick = (id) => {
        navigate("/ofertas/" + id + "/candidaturas/create");
    };

    const ImageComponent = ({ imageUrl }) => {
        const [imageSrc, setImageSrc] = useState('');

        useEffect(() => {
            const loadImage = async () => {
                try {
                    const response = await axios.get(imageUrl, {
                        headers: authHeader(),
                        responseType: 'blob'
                    });
                    const imageUrlLoaded = URL.createObjectURL(response.data);
                    setImageSrc(imageUrlLoaded);
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            if (imageUrl) {
                loadImage();
            }
        }, [imageUrl]);

        if (!imageSrc) {
            return <span>Loading image...</span>;
        }

        return <img className="imagem" src={imageSrc} alt="Image..." />;
    };

    return (
        <div className="popup" onClick={onClose}>
            <div className="popup-inner big-text" onClick={(e) => e.stopPropagation()}>
                <div key={selectedOfertavaga.id} className="col-lg-4 teste">
                    <div className="card popup-card card-margin">
                        <button className="btn-cand" onClick={() => handleClick(selectedOfertavaga.id)}>Candidatar</button>
                        <button className="close-btn" onClick={onClose}><AiOutlineCloseCircle /></button>
                        <div className="card-header no-border">
                            <h4 className="card-title mt-3">{selectedOfertavaga.titulo}</h4>
                        </div>
                        <div className="card-body pt-0">
                            <div className="widget-49">
                                <div className="widget-49-meeting-points mt-2 ml-5">
                                    <div>
                                        <strong>Departamento</strong>
                                        <p>{selectedOfertavaga.departamento}</p>
                                    </div>
                                    <div>
                                        <ImageComponent imageUrl={`https://pint-backend.onrender.com/ofertas/image/${selectedOfertavaga.imagem}`} />
                                    </div>
                                </div>
                                <div className="widget-49-meeting-points mt-3">
                                    <div style={{ paddingRight: '60px' }}>
                                        <strong>Experiencia Anterior</strong>
                                        <p>{selectedOfertavaga.tempo_minimo_de_experiencia}</p>
                                    </div>
                                    <div>
                                        <strong style={{ marginRight: '90px' }}>Localização</strong>
                                        <p>{selectedOfertavaga.localizacao}</p>
                                    </div>
                                    <div>
                                        <strong>Habilitações minimas</strong>
                                        <p>{selectedOfertavaga.habilitacoes_minimas}</p>
                                    </div>
                                </div>
                                <div className="widget-49-meeting-points mt-1">
                                    <div style={{ paddingRight: '60px' }}>
                                        <strong>Descrição</strong>
                                        <p>{selectedOfertavaga.descricao}</p>
                                    </div>
                                </div>
                                <div className="widget-49-meeting-action">
                                    <h6>Data de Atualização: {selectedOfertavaga.data_atualizacao.slice(0, 10)}</h6>
                                </div>
                                <div className="widget-49-meeting-action">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Popup;
