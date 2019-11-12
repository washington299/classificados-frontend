import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import useApi from '../../helpers/Api';
import AdItem from '../../components/partials/AdItem';

import AdsArea from './styles';
import { PageContainer } from '../../components/templateComponents';

const Ads = () => {
  const api = useApi();

  function useQueryString() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQueryString();

  const [q, setQ] = useState( query.get('q') !== null ? query.get('q') : '' );
  const [cat, setCat] = useState( query.get('cat') !== null ? query.get('cat') : '' );
  const [state, setState] = useState( query.get('state') !== null ? query.get('state') : '' );

  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);

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

  useEffect(() => {
    async function getRecentAds() {
      const json = await api.getAds({
        sort: 'desc',
        limit: 8,
      });

      setAdList(json.ads);
    }
    getRecentAds();
  }, []);

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
              {stateList.map((state) => (
                <option key={state._id} value={state.name}>{state.name}</option>
              ))}
            </select>

            <div className="filterName">Categoria:</div>
            <ul>
              {categories.map((category) => (
                <li
                  key={category._id}
                  className={cat === category.slug ? 'categoryItem active' : 'categoryItem'}
                >
                  <img src={category.img} alt={category.name} />
                  <span>{category.name}</span>
                </li>
              ))}
            </ul>
          </form>
        </div>
        <div className="rightSide">
          ...
        </div>
      </AdsArea>
    </PageContainer>
  );
};

export default Ads;
