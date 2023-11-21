import { Link, useLocation } from "react-router-dom";
import './sidebar.css'
import './backofsidebar.css'



import authService from "../view/auth.service";
import { TbTarget } from "react-icons/tb";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2"
import { BsLightbulbFill } from "react-icons/bs"
import { AiFillTags, AiOutlineDashboard } from "react-icons/ai"
import { HiUsers } from "react-icons/hi2"
import { TiWarningOutline } from "react-icons/ti"


function Sidebar() {
  const Location = useLocation();

  return (
    <div className="d-flex flex-column flex-shrink-0 p-4 bg-light sidebar bosidebar">
      <ul className="nav nav-pills flex-column ">
        <li>
          <Link to="/backoffice/dashboard/oportunidades" className={`nav-link ${Location.pathname === "/backoffice/dashboard/oportunidades" || Location.pathname === '/backoffice/dashboard/ofertas' ? "active" : "link-dark"}  mb-3`}>
            <svg className="bi me-2" width="16" height="16">
              <AiOutlineDashboard size={15} />
            </svg>
            <span className="name">Dashboard</span>
          </Link>
        </li>
        {authService?.getPermission() === 1 || authService?.getPermission() === 2 ? (
          <li>
            <Link
              to="/backoffice/oportunidades"
              className={`nav-link ${Location.pathname === "/backoffice/oportunidades"
                ? "active"
                : "link-dark"
                }  mb-3`}
            >
              <svg className="bi me-2" width="16" height="16">
                <TbTarget size={15} />
              </svg>
              <span className="name">Oportunidades</span>
            </Link>

          </li>
        ) : (null)}

        {authService?.getPermission() === 1 || authService?.getPermission() === 7 ? (
          <li>
            <Link to="/backoffice/ofertas" className={`nav-link ${Location.pathname === "/backoffice/ofertas" ? "active" : "link-dark"}  mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <HiOutlineMagnifyingGlass size={15} />
              </svg>
              <span className="name">Ofertas/Vagas</span>
            </Link>
          </li>
        ) : (null)}

        {authService?.getPermission() === 1 || authService?.getPermission() === 6 ? (
          <li>
            <Link to="/backoffice/ideias" className={`nav-link ${Location.pathname === "/backoffice/ideias" ? "active" : "link-dark"}  mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <BsLightbulbFill size={15} />
              </svg>
              <span className="name">Ideias</span>
            </Link>
          </li>
        ) : (null)}

        {authService?.getPermission() === 1 ? (
          <li>
            <Link to="/backoffice/users" className={`nav-link ${Location.pathname === "/backoffice/users" ? "active" : "link-dark"}  mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <HiUsers size={15} />
              </svg>
              <span className="name">Utilizadores</span>
            </Link>
          </li>
        ) : (null)}

        {authService?.getPermission() === 1 || authService?.getPermission() === 2 ? (
          <li>
            <Link to={"/backoffice/tipos"} className={`nav-link ${Location.pathname === "/backoffice/tipos" ? "active" : "link-dark"}  mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <AiFillTags size={15} />
              </svg>
              <span className="name">Tipos</span>
            </Link>
          </li>
        ) : (null)}

      </ul>
    </div>
  );
}
export default Sidebar;