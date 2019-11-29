import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import AddArea from './styles';
import useApi from '../../helpers/Api';

import {
  PageContainer,
  PageTitle,
  ErrorMessage,
} from '../../components/templateComponents';

const AddAd = () => {
  const api = useApi();
  const fileField = useRef();
  const history = useHistory();

  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [priceNeg, setPriceNeg] = useState(false);
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
      fData.append('priceneg', priceNeg);
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

  return (
    <PageContainer>
      <PageTitle>Adicionar um Produto</PageTitle>

      <AddArea>
        <form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <label className="area">
            <div className="area--title">Titulo:</div>
            <div className="area--input">
              <input
                type="text"
                disabled={disabled}
                value={title}
                required
                onChange={e => setTitle(e.target.value)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Categorias:</div>
            <div className="area--input">
              <select
                disabled={disabled}
                onChange={e => setCategory(e.target.value)}
                required
              >
                <option />
                {categories &&
                  categories.map(i => (
                    <option key={i._id} value={i.name}>
                      {i.name}
                    </option>
                  ))}
              </select>
            </div>
          </label>

          <label className="area">
            <div className="area--title">Preço:</div>
            <div className="area--input">
              <NumberFormat
                value={price}
                onValueChange={values => {
                  setPrice(values.formattedValue);
                }}
                prefix="R$"
                decimalSeparator=","
                thousandSeparator="."
                allowNegative={false}
                placeholder="R$"
                disabled={disabled || (priceNeg === true && 'disabled')}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Preço negociável:</div>
            <div className="area--input">
              <input
                type="checkbox"
                disabled={disabled || (price !== '' && 'disabled')}
                checked={priceNeg}
                onChange={() => setPriceNeg(!priceNeg)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Descrição:</div>
            <div className="area--input">
              <textarea
                disabled={disabled}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Imagens: (1 ou mais)</div>
            <div className="area--input">
              <input type="file" disabled={disabled} ref={fileField} multiple />
            </div>
          </label>

          <div className="area">
            <div className="area--title" />
            <div className="area--input">
              <button type="submit" disabled={disabled}>
                Adicionar anúncio
              </button>
            </div>
          </div>
        </form>
      </AddArea>
    </PageContainer>
  );
};

export default AddAd;
