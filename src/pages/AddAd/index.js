import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import LoginArea from './styles';
import useApi from '../../helpers/Api';

import { PageContainer, PageTitle, ErrorMessage } from '../../components/templateComponents';

const Login = () => {
  const api = useApi();
  const fileField = useRef();
  const history = useHistory();

  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [description, setDescription] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getCategories() {
      const response = await api.getCategories();

      setCategories(response);
    }
    getCategories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    setError('');
    const errors = [];

    if (!title.trim()) {
      errors.push('Digite um título!');
    }
    if (!category) {
      errors.push('Escolha uma categoria!');
    }

    if (errors.length === 0) {
      const fData = new FormData();

      fData.append('title', title);
      fData.append('price', price);
      fData.append('priceneg', priceNegotiable);
      fData.append('desc', description);
      fData.append('cat', category);

      if (fileField.current.files.length > 0) {
        for (let i = 0; i < fileField.current.files.length; i += 1) {
          fData.append('img', fileField.current.files[i]);
        }
      }

      const response = await api.addAd(fData);

      if (!response.error) {
        history.push(`/ad/${response.id}`);
        return;
      }

      setError(response.error);
    } else {
      setError(errors.join('/n'));
    }

    setDisabled(false);
  }

  const priceMask = createNumberMask({
    prefix: 'R$ ',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
  });

  return (
    <PageContainer>
      <PageTitle>Postar um anúncio</PageTitle>

      <LoginArea>
        <form onSubmit={handleSubmit}>
          {error && (
            <ErrorMessage>{error}</ErrorMessage>
          )}

          <label className="area">
            <div className="area--title">Titulo:</div>
            <div className="area--input">
              <input
                type="text"
                disabled={disabled}
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Categorias:</div>
            <div className="area--input">
              <select
                disabled={disabled}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option />
                {categories && categories.map((i) => (
                  <option key={i._id} value={i._id}>{i.name}</option>
                ))}
              </select>
            </div>
          </label>

          <label className="area">
            <div className="area--title">Preço:</div>
            <div className="area--input">
              <MaskedInput
                mask={priceMask}
                placeholder="R$ "
                disabled={disabled || priceNegotiable}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Preço negociável:</div>
            <div className="area--input">
              <input
                type="checkbox"
                disabled={disabled}
                checked={priceNegotiable}
                onChange={() => setPriceNegotiable(!priceNegotiable)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Descrição:</div>
            <div className="area--input">
              <textarea
                disabled={disabled}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Imagens: (1 ou mais)</div>
            <div className="area--input">
              <input
                type="file"
                disabled={disabled}
                ref={fileField}
                multiple
              />
            </div>
          </label>

          <div className="area">
            <div className="area--title" />
            <div className="area--input">
              <button type="submit" disabled={disabled}>Adicionar anúncio</button>
            </div>
          </div>
        </form>
      </LoginArea>
    </PageContainer>
  );
};

export default Login;
