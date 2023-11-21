import React from 'react';
import './home.css';
import Calendario from './Calendario/Calendario';

export default function IndexPage() {
  return (
    <div className='home'>
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="https://scontent.flis7-1.fna.fbcdn.net/v/t39.30808-6/332953744_1258341121764646_7557388037049333728_n.png?_nc_cat=110&ccb=1-7&_nc_sid=e3f864&_nc_ohc=Y4XRRA8W1H0AX860KZH&_nc_oc=AQl0DdYSATRe8a0to5j5N4-iVG5t4CbAJILoiwOwVqnSulxrvX5DzAPI-FFNz5MwPb8&_nc_ht=scontent.flis7-1.fna&oh=00_AfB28BxtVCh38Q3lD-sQs_vblbr5LPswc47tfbFLVSwo7A&oe=649F52AC" alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://scontent.flis7-1.fna.fbcdn.net/v/t39.30808-6/339571238_935750417848371_572054612576908157_n.png?_nc_cat=101&ccb=1-7&_nc_sid=e3f864&_nc_ohc=9frWEmsD6T8AX836Dr8&_nc_ht=scontent.flis7-1.fna&oh=00_AfAU2quV5DTMVTduB5iUHfxHfNXkQoQEh6-MC1Or7JXk1w&oe=649E23D6" alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://scontent.flis7-1.fna.fbcdn.net/v/t39.30808-6/317614911_8597220900350562_2973731024008552483_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=e3f864&_nc_ohc=4g77KY-ve6EAX8fNqy7&_nc_ht=scontent.flis7-1.fna&oh=00_AfA2H1YJxfaT6piYQfZRrHyss9DiHl4vhjuAwgAQm53XHQ&oe=649F3CA2" alt="Third slide" />
          </div>
        </div>
      </div>
      
      <div className='calendario'>
      <Calendario/>
      </div>
    </div>
  );
}