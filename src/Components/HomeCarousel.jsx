import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../HomeCarousel.css'; 
import { Link } from 'react-router-dom';



function HomeCarousel() {
  return (
    <Carousel>
      <Carousel.Item as={ Link } to="/sapatilhas">
        <img src="https://www.si.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_xy_center%2Cq_auto:good%2Cw_1200%2Cx_1994%2Cy_1934/MTk4MTQ4NTkzMjI2MzU5OTk4/nike-lebron.jpg" 
        className="d-block w-100 carousel-image"
        alt="Sapatilhas"
        />
        <Carousel.Caption>
          <h3 className="carousel-text">Sapatilhas</h3>
          <h5 className="carousel-text">Clica aqui para ver os nossos modelos! </h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item as={ Link } to="/equipamentos">
        <img src="https://static.nike.com/a/images/t_prod/w_1920,c_limit,f_auto,q_auto/c981ebd4-0377-4ce2-af1e-46fb67688bba/pdp.jpg" 
        className="d-block w-100 carousel-image"
        alt="Sapatilhas"
        />
        <Carousel.Caption>
          <h3 className="carousel-text">Equipamento</h3>
          <h5 className="carousel-text">Clica aqui para ver os nossos equipamentos! </h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item as={ Link } to="/acessorios">
        <img src="https://images-cdn.ubuy.co.id/652e455e0cad854c0734a883-podinor-elite-basketball-crew-socks-for.jpg" 
        className="d-block w-100 carousel-image"
        alt="Sapatilhas"
        />
        <Carousel.Caption>
          <h3 className="carousel-text">Acessórios</h3>
          <h5 className="carousel-text">Clica aqui para ver os nossos acessórios! </h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item as={ Link } to="/conjuntos">
        <img src="https://static01.nyt.com/images/2023/05/14/multimedia/14nba-playoffs-celtics-sixers-tatum-zlcm/14nba-playoffs-celtics-sixers-tatum-zlcm-videoSixteenByNine3000.jpg" 
        className="d-block w-100 carousel-image"
        alt="Sapatilhas"
        />
        <Carousel.Caption>
          <h3 className="carousel-text">Conjuntos</h3>
          <h5 className="carousel-text">Clica aqui para ver os nossos conjuntos! </h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item as={ Link } to="/material">
        <img src="https://frasertheagency.com/wp-content/uploads/2023/02/Header_Sports-1-1.jpg" 
        className="d-block w-100 carousel-image"
        alt="Sapatilhas"
        />
        <Carousel.Caption>
          <h3 className="carousel-text">Material</h3>
          <h5 className="carousel-text">Clica aqui para ver o nosso material! </h5>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;
