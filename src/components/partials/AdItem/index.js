import React from 'react';
import { Link } from 'react-router-dom';

import Item from './styles';

const AdItem = ({ data }) => {
  let { price } = data;
  const [img] = data.photos_url;

  if (data.priceNeg) {
    price = 'Preço negociável';
  } else {
    price = data.price;
  }

  return (
    <Item className="adItem">
      <Link to={`/ad/${data.id}`}>
        <div className="itemImage">
          <img src={img} alt={data.title} />
        </div>
        <div className="itemName">{data.title}</div>
        <div className="itemPrice">
          {data.priceNeg && 'Preço negociável'}
          {data.priceNeg === false &&
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(price)}
        </div>
      </Link>
    </Item>
  );
};
export default AdItem;
