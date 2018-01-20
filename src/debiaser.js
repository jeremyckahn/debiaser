import React, { Component } from 'react';
import sortBy from 'lodash.sortby'

const sources = [
  'msnbc',
  'cnn',
  'the-new-york-times',
  'associated-press',
  'reuters',
  'cbs-news',
  'time',
  'the-hill',
  'fox-news',
  'breitbart-news'
];

const results = 100;

const sourceNum = sources.length;
const rangeSize = 0.2;

const Article = ({ author, description, publishedAt, title, url, source }) =>
  <li>
    <h3><a href={url} target="_blank">{title}</a></h3>
    <h4>Source: {source.name}</h4>
    <p>{description}</p>
  </li>

export class Debiaser extends Component {
  constructor () {
    super(...arguments);

    this.state = {
      sliderVal: 0.5
    }

    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  handleSliderChange ({ target: { value } }) {
    this.setState({ sliderVal: value })
  }

  render () {
    const { articles } = this.props;
    const { sliderVal } = this.state;

    const rangeStart = Math.max(Number(sliderVal) - rangeSize, 0);
    const rangeEnd = Math.min(Number(sliderVal) + rangeSize, 1);

    const matchingSources = sources.filter((source, i) =>
       i >= Math.floor(sourceNum * rangeStart) && i <= Math.ceil(sourceNum * rangeEnd)
    );

    let matchingArticles = articles.filter(article => {
      if (matchingSources.includes(article.source.id)) {
        return article;
      }
    });

    const sortedArticles = sortBy(matchingArticles, article => article.title);

    return <div>
      <h1>Debiaser</h1>
      <p>Control your news via the bias of the news source!</p>
      <span>Left-leaning sources</span>
      <input
        type="range"
        min={0}
        max={1}
        value={sliderVal}
        step={0.1}
        onChange={this.handleSliderChange}
      />
      <span>Right-leaning sources</span>
      <ul>
        {sortedArticles.map(({ author, description, publishedAt, title, url, source }) =>
          <Article key={url}
            author={author}
            description={description}
            publishedAt={publishedAt}
            title={title}
            url={url}
            source={source}
          />
        )}
      </ul>
    </div>
  }
}

// FIXME: Move this to a proper constants file or something
Debiaser.url = `https://debiaser-service.now.sh/top-headlines/?pageSize=${results}&sources=${sources.join(',')}`;
