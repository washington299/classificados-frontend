import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';

import AdItem from '../../components/partials/AdItem';

import {
  AdArea,
  Fake,
  OthersArea,
  BreadChumb,
} from './styles';
import useApi from '../../helpers/Api';

import { PageContainer } from '../../components/templateComponents';

const Register = () => {
  const api = useApi();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [adInfo, setAdInfo] = useState([]);

  useEffect(() => {
    async function getAdInfo(adId) {
      const response = await api.getAd(adId, true);

      setAdInfo(response);
      setLoading(false);
    }
    getAdInfo(id);
  }, []);

  function formatDate(date) {
    const cDate = new Date(date);

    const months = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ];
    const cDay = cDate.getDate();
    const cMonth = cDate.getMonth();
    const cYear = cDate.getFullYear();

    return ` ${cDay} de ${months[cMonth]} de ${cYear}.`;
  }

  const slideProperties = {
    transitionDuration: 300,
  };

  return (
    <PageContainer>
      {adInfo.category && (
        <BreadChumb>
          Você está aqui:
          <Link to="/">Home</Link>
          /
          <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
          /
          <Link
            to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}
          >
            {adInfo.category.name}
          </Link>
          /&nbsp;
          {adInfo.title}
        </BreadChumb>
      )}
      <AdArea>
        <div className="leftSide">
          <div className="box">
            <div className="adImage">
              {loading && <Fake height={300} />}
              {adInfo.images && (
                <Slide {...slideProperties}>
                  {adInfo.images.map((image) => (
                    <div key={image.id} className="each-slide">
                      <img src={image} alt="" />
                    </div>
                  ))}
                </Slide>
              )}
            </div>
            <div className="adInfo">
              <div className="adName">
                {loading && <Fake height={30} />}
                {adInfo.title && (
                  <h2>{adInfo.title}</h2>
                )}
                {adInfo.dateCreated && (
                  <small>
                    Criado em
                    {formatDate(adInfo.dateCreated)}
                  </small>
                )}
              </div>
              <div className="adDescription">
                {loading && <Fake height={100} />}
                {adInfo.description}

                <hr />

                {adInfo.views && (
                  <small>
                    {`Visualizaçoes: ${adInfo.views}`}
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="box box--padding">
            {loading && <Fake height={30} />}
            {adInfo.priceNegotiable && (
              <span>Preço negociável</span>
            )}
            {!adInfo.priceNegotiable && adInfo.price && (
              <div className="price">
                Preço:
                <span>{`R$ ${adInfo.price}`}</span>
              </div>
            )}
          </div>
          {loading && <Fake height={180} />}
          {adInfo.userInfo && (
            <>
              <a
                href={`mailto:${adInfo.userInfo.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contactSellerLink"
              >
                Fale com o vendedor
              </a>
              <div className="createdBy box box--padding">
                Vendedor:
                <strong>{adInfo.userInfo.name}</strong>
                <small>{`E-mail: ${adInfo.userInfo.email}`}</small>
                <small>{`Estado: ${adInfo.stateName}`}</small>
              </div>
            </>
          )}
        </div>
      </AdArea>
      <OthersArea>
        {loading && <Fake height={30} marginBottom={20} />}
        {loading && <Fake height={300} />}
        {adInfo.others && (
          <>
            <h3>Outras ofertas do vendedor</h3>
            <div className="list">
              {adInfo.others.map((ad) => (
                <AdItem key={ad.id} data={ad} />
              ))}
            </div>
          </>
        )}
      </OthersArea>
    </PageContainer>
  );
};

export default Register;
