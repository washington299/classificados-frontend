import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';

import AdItem from '../../components/partials/AdItem';

import { AdArea, Fake, OthersArea, BreadChumb } from './styles';
import useApi from '../../helpers/Api';

import { PageContainer } from '../../components/templateComponents';

const AdPage = () => {
  const api = useApi();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [adInfo, setAdInfo] = useState([]);
  const [othersAds, setOthersAds] = useState([]);

  useEffect(() => {
    async function getAdInfo(adId) {
      const response = await api.getAd(adId, true);

      setAdInfo(response.ad);
      setOthersAds(response.others);
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
      {adInfo.ad && (
        <BreadChumb>
          Você está aqui:
          <Link to="/">Home</Link>/
          <Link to={`/ads?state=${adInfo.state}`}>{adInfo.state}</Link>/
          <Link to={`/ads?state=${adInfo.state}&cat=${adInfo.category}`}>
            {adInfo.category}
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
              {adInfo.photos_url && (
                <Slide {...slideProperties}>
                  {adInfo.photos_url.map(image => (
                    <div key={image} className="each-slide">
                      <img src={image} alt="" />
                    </div>
                  ))}
                </Slide>
              )}
            </div>
            <div className="adInfo">
              <div className="adName">
                {loading && <Fake height={30} />}
                {adInfo.title && <h2>{adInfo.title}</h2>}
                {adInfo.createdAt && (
                  <small>
                    Criado em
                    {formatDate(adInfo.createdAt)}
                  </small>
                )}
              </div>
              <div className="adDescription">
                {loading && <Fake height={100} />}
                {adInfo.description}

                <hr />

                {adInfo.views && (
                  <small>{`Visualizaçoes: ${adInfo.views}`}</small>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="box box--padding">
            {loading && <Fake height={30} />}
            {adInfo.priceNeg && <span>Preço negociável</span>}
            {!adInfo.priceNeg && adInfo.price && (
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
                <small>{`Estado: ${adInfo.userInfo.state}`}</small>
              </div>
            </>
          )}
        </div>
      </AdArea>
      <OthersArea>
        {loading && <Fake height={30} marginBottom={20} />}
        {loading && <Fake height={300} />}
        {othersAds && (
          <>
            <h3>Outras ofertas do vendedor</h3>
            <div className="list">
              {othersAds.map(ad => (
                <AdItem key={ad._id} data={ad} />
              ))}
            </div>
          </>
        )}
      </OthersArea>
    </PageContainer>
  );
};

export default AdPage;
