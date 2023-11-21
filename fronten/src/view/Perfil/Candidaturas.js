import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import authService from "../auth.service";
import authHeader from "../auth.header";




export default function CandidaturasPerfil() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(true);
    const [dataOfertas, setdataOfertas] = React.useState([]);


    const handlePDFClick = (url) => {
        axios.get(url, { headers: authHeader(), responseType: 'blob' })
          .then(response => {
              console.log(response);
              const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
              const pdfUrl = URL.createObjectURL(pdfBlob);
              window.open(pdfUrl, '_blank');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    function ShowOfertas(){
        const filteredData = dataOfertas.filter((data) =>{
            return data.user.id === authService.getCurrentUser().id;
        })
        const sortedData = filteredData.sort((a, b) => {
            return new Date(b.data_criacao) - new Date(a.data_criacao);
        });


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
        return sortedData.map((data)=>{
            const downloadUrl = `https://pint-backend.onrender.com/candidaturas/ofertas/${data.ofertasvagaId}/file/${data.curriculo}`
            return(
                <div key={data.id} className="col-lg-4 no-modal">
                    <div className="card cardb card-margin">
                        <hr className='linha_card' />
                        <div className="card-header no-border">
                            <h5 className="card-title mt-0">{data.ofertasvaga.titulo}</h5>
                        </div>
                        <div className="card-body pt-0">
                            <div className="widget-49 flex" style={{position: 'relative', minHeight: '150px'}}>
                                <div className="widget-49-meeting-points mt-0 ml-5">
                                    <div>
                                        <ImageComponent style={{maxWidth: '150px', height: '150px', borderRadius: '5px'}} imageUrl={`https://pint-backend.onrender.com/ofertas/image/${data.ofertasvaga.imagem}`} />

                                        {/* <img style={{maxWidth: '150px', height: '150px', borderRadius: '5px'}} src={data.ofertasvaga.imagem} /> */}
                                    </div>
                                </div>
                                <div  style={{position: 'absolute', right: '10%', top: '0', textAlign: 'center'}}>
                                    <div>
                                        <h6 style={{marginBottom: '0'}}>Data da Candidatura</h6>
                                        <h7>{data.data_candidatura.slice(0,10)}</h7>
                                    </div>
                                    <div>
                                        <h6 style={{marginBottom: '0'}}>Estado</h6>
                                        <h7>{data.estadoscandidatura.estado}</h7>
                                    </div>
                                    <div>
                                        <h6 style={{marginBottom: '0'}}>Curriculo</h6>
                                        <h7 ><Link onClick={() => {handlePDFClick(downloadUrl); }}>{data.curriculo}</Link></h7>
                                    </div>
                                </div>
                            </div>
                            <div className="widget-49-meeting-info">
                                <h6 style={{marginTop: '10px'}}>Observações</h6>
                                <h7>{data.observacoes}</h7>
                            </div>
                        </div>

                    </div>

                </div>
            )
        })
    }

    function LoadOfertas() {
        setIsLoading(true);
        const url = "https://pint-backend.onrender.com/candidaturas/list";
        axios.get(url, { headers: authHeader() })
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setdataOfertas(data);
                setIsLoading(false);
            }else{
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: res.data.message,
                    showCloseButton: true
                  })
                  authService.logout();
                  navigate('/login');
            }
        })
        .catch(error => {
            alert(error)
            setIsLoading(false);
        });
    }
    
    useEffect(() => {
        LoadOfertas();
    },[]);

    return (
        <div style={{marginLeft: '100px'}}>
            <ul class="nav nav-pills nav-fill mb-4" style={{width: '33.3%', marginLeft: '33.3%'}}>
                <li class="nav-item">
                    <Link class="nav-link " aria-current="page" to={"/perfil"}>Detalhes</Link>
                </li>
                <li class="nav-item">
                <Link class="nav-link" aria-current="page" to={"/perfil/oportunidades"}>Oportunidades</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to={"/perfil/Candidaturas"}>Candidaturas</Link>
                </li>
            </ul>

            {isLoading &&(
                <div className="loading">
                    <SyncLoader color="#0D6EFD" />
                </div>
            )}
            <div className="row cartoes">
                <ShowOfertas/>
            </div>
        </div>
    )
}