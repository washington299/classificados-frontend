import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import useApi from '../../helpers/Api';

import AdsArea from './styles';
import { PageContainer } from '../../components/templateComponents';
import AdItem from '../../components/partials/AdItem';

let timer;

const Ads = () => {
  const api = useApi();
  const history = useHistory();

  function useQueryString() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQueryString();

  const [q, setQ] = useState(query.get('q') !== null ? query.get('q') : '');
  const [cat, setCat] = useState(query.get('cat') !== null ? query.get('cat') : '');
  const [state, setState] = useState(query.get('state') !== null ? query.get('state') : '');

  const [adsTotal, setAdsTotal] = useState(0);
  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);

  const [resultOpacity, setResultOpacity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  async function getAdsList() {
    setLoading(true);
    const offset = (currentPage - 1) * 2;

    const json = await api.getAds({
      sort: 'desc',
      limit: 9,
      q,
      state,
      cat,
      offset,
    });

    setAdList(json.ads);
    setAdsTotal(json.total);
    setResultOpacity(1);
    setLoading(false);
  }

  useEffect(() => {
    if (adList.length > 0) {
      setPageCount(Math.ceil(adsTotal / adList.length));
    } else {
      setPageCount(0);
    }
  }, [adsTotal]);

  useEffect(() => {
    const queryString = [];

    if (q) {
      queryString.push(`q=${q}`);
    }
    if (state) {
      queryString.push(`state=${state}`);
    }
    if (cat) {
      queryString.push(`cat=${cat}`);
    }

    history.replace({
      search: `${queryString.join('&')}`,
    });

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(getAdsList, 2000);
    setResultOpacity(0.3);
    setCurrentPage(1);
  }, [q, cat, state]);

  useEffect(() => {
    setResultOpacity(0.3);
    getAdsList();
  }, [currentPage]);

  useEffect(() => {
    async function getStates() {
      const response = await api.getStates();
      setStateList(response);
    }
    getStates();
  }, []);

  useEffect(() => {
    async function getCategories() {
      const response = await api.getCategories();
      setCategories(response);
    }
    getCategories();
  }, []);

  const pagination = [];
  for (let i = 1; i <= pageCount; i += 1) {
    pagination.push(i);
  }

  return (
    <PageContainer>
      <AdsArea>
        <div className="leftSide">
          <form method="GET">
            <input
              type="text"
              name="q"
              placeholder="O que você procura?"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />

            <div className="filterName">Estado:</div>
            <select name="state" value={state} onChange={(e) => setState(e.target.value)}>
              <option />
              {stateList.map((location) => (
                <option key={location._id} value={location.name}>{location.name}</option>
              ))}
            </select>

            <div className="filterName">Categoria:</div>
            <ul>
              {categories.map((category) => (
                <li
                  key={category._id}
                  className={cat === category.slug ? 'categoryItem active' : 'categoryItem'}
                  onClick={() => setCat(category.slug)}
                >
                  <img src={category.img} alt={category.name} />
                  <span>{category.name}</span>
                </li>
              ))}
            </ul>
          </form>
        </div>
        <div className="rightSide">
          <h2>Resultados:</h2>
          {loading && adList.length === 0 && (
            <div className="listWarning">Carregando...</div>
          )}
          {!loading && adList.length === 0 && (
            <div className="listWarning">Nenhum resultado encontrado.</div>
          )}
          <div className="list" style={{ opacity: resultOpacity }}>
            {adList.map((ad) => (
              <AdItem key={ad.id} data={ad} />
            ))}
          </div>

          <div className="pagination">
            {pagination.map((n) => (
              <div
                onClick={() => setCurrentPage(n)}
                className={n === currentPage ? 'pageNumber active' : 'pageNumber'}
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      </AdsArea>
    </PageContainer>
  );
};

export default Ads;
