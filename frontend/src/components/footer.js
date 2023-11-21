import './footer.css'

import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";

function Footer(){
    return(
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top footer">
        <div className="col-md-4 d-flex align-items-center">
          <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            <svg className="bi" width="30" height="24"></svg>
          </a>
          <span className="text-muted">© Softinsa 2023. Todos os direitos reservados</span>
       </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex icons">
          <li className="ms-3"><a className="text-muted" target='blank' href="https://www.facebook.com/Softinsa/"><BsFacebook/></a></li>
          <li className="ms-3"><a className="text-muted" target='blank' href="https://www.instagram.com/softinsa/"><BsInstagram/></a></li>
          <li className="ms-3"><a className="text-muted" target='blank' href="https://pt.linkedin.com/company/softinsa"><BsLinkedin/></a></li>
        </ul>
      </footer>
    );
}
export default Footer;