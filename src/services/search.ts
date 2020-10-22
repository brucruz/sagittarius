import algoliasearch from 'algoliasearch';

const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
  ? process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
  : '';
const algoliaAppKey = process.env.NEXT_PUBLIC_ALGOLIA_APP_KEY
  ? process.env.NEXT_PUBLIC_ALGOLIA_APP_KEY
  : '';

const searchClient = algoliasearch(algoliaAppId, algoliaAppKey);

const examIndex = searchClient.initIndex('exams');

export default examIndex;
