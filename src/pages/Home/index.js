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
    <>
      <SearchArea>
        <PageContainer>
          <div className="searchBox">
            <form method="GET" action="/ads">
              <input
                type="text"
                name="q"
                placeholder="O que você quer buscar?"
              />
              <select name="state">
                <option value="" />
                {stateList.map(state => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <button type="submit">
                <FaSearch />
                Buscar
              </button>
            </form>
          </div>
          <div className="categoryList">
            {categories.map(category => (
              <Link
                key={category._id}
                to={`/ads?cat=${category.slug}`}
                className="categoryItem"
              >
                <img src={category.thumbnail_url} alt="" />
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </PageContainer>
      </SearchArea>
      <PageContainer>
        <HomeArea>
          <h2>Produtos recentes</h2>
          <div className="list">
            {adList.map(ad => (
              <AdItem key={ad._id} data={ad} />
            ))}
          </div>
          <Link to="ads" className="viewAllAds">
            Ver todos &gt;&gt;&gt;
          </Link>
          <hr />
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has beenthe industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries.
        </HomeArea>
      </PageContainer>
    </>
  );
};

export default Home;
