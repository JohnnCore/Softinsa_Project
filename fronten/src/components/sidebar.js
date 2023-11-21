import { Link, useLocation } from "react-router-dom";
import './sidebar.css'




import { AiFillHome, AiFillWarning } from "react-icons/ai";
import {TbTarget} from "react-icons/tb";
import {HiOutlineMagnifyingGlass} from "react-icons/hi2"
import {BsLightbulbFill} from "react-icons/bs"



function Sidebar(){
  const Location = useLocation();

    return(
        <div  className="d-flex flex-column flex-shrink-0 p-4 sidebar">
        <ul className="nav nav-pills flex-column ">
          <li>
            <Link to="/home" className={`nav-link ${Location.pathname === "/home" ? "active" : "link-dark"}  mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <AiFillHome size={15}/>
              </svg>
              <span className="name">Página Principal</span>
            </Link>
          </li>
          <li>
            <Link to="/oportunidades" className={`nav-link ${Location.pathname === "/oportunidades" ? "active" : "link-dark"}  mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <TbTarget size={15} />
              </svg>
              <span className="name">Oportunidades</span>
            </Link>
          </li>
          <li>
            <Link to="/ofertas" className={`nav-link ${Location.pathname === "/ofertas" ? "active" : "link-dark"}  mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <HiOutlineMagnifyingGlass size={15} />
              </svg>
              <span className="name">Ofertas/Vagas</span>
            </Link>
          </li>
          <li>
            <Link to="/ideias" className={`nav-link ${Location.pathname === "/ideias" ? "active" : "link-dark"}  mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <BsLightbulbFill size={15} />
              </svg>
              <span className="name">Ideias</span>
            </Link>
          </li>
        </ul>
      </div>
    );
}
export default Sidebar;