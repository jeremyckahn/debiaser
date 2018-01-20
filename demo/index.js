import React from 'react';
import ReactDOM from 'react-dom';
import sortBy from 'lodash.sortby'

import { Debiaser } from '../src/index.js';

fetch(Debiaser.url).then(
  res => res.json()
).then(
  news =>
    ReactDOM.render(
      <Debiaser articles={sortBy(news.articles, article => article.source.id)} />,
      document.getElementById('app')
    )
);
