import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

import useApi from '../../helpers/Api';
import AdItem from '../../components/partials/AdItem';

import { HomeArea, SearchArea } from './styles';
import { PageContainer } from '../../components/templateComponents';

const Home = () => {
  const api = useApi();

  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ads, setAds] = useState([]);

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
    async function getRecentsAds() {
      const json = await api.getAds({
        sort: 'desc',
        limit: 8,
      });

      setAds(json.ads);
    }
    getRecentsAds();
  }, []);

  return (
    <>
      <SearchArea>
        <PageContainer>
          <div className="searchBox">
            <form method="GET">
              <input
                type="text"
                name="q"
                placeholder="O que você quer buscar?"
              />
              <select name="state">
                <option value="" />
                {stateList.map((state) => (
                  <option key={state._id} value={state._id}>{state.name}</option>
                ))}
              </select>
              <button type="submit">
                <FaSearch />
                Buscar
              </button>
            </form>
          </div>
          <div className="categoryList">
            {categories.map((category) => (
              <Link key={category._id} to={`/ads?cat=${category.slug}`} className="categoryItem">
                <img src={category.img} alt="" />
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </PageContainer>
      </SearchArea>
      <PageContainer>
        <HomeArea>
          <h2>Anúncios recentes</h2>
          <div className="list">
            {ads.map((ad) => (
              <AdItem key={ad.id} data={ad} />
            ))}
          </div>
          <Link to="ads" className="viewAllAds">Ver todos &gt;&gt;&gt;</Link>
          <hr />
          mdslmflsdnfkjdsnfjksdhfkjdshfjkhdkshfjkhjkhkjhkjhkuwiqyduiaidhsiauciusahdi
          mdslmflsdnfkjdsnfjksdhfkjdshfjkhdkshfjkhjkhkjhkjhkuwiqyduiaidhsiauciusahdi
          mdslmflsdnfkjdsnfjksdhfkjdshfjkhdkshfjkhjkhkjhkjhkuwiqyduiaidhsiauciusahdi
          mdslmflsdnfkjdsnfjksdhfkjdshfjkhdkshfjkhjkhkjhkjhkuwiqyduiaidhsiauciusahdi
        </HomeArea>
      </PageContainer>
    </>
  );
};

export default Home;
