const { format, parseISO } = require('date-fns');
const fs = require('fs');
const zlib = require('zlib');
const { promisify } = require('util');
const { pipeline } = require('stream');
const Axios = require('axios');
const seoLocations = require('../contents/seoLocations');

(async () => {
  const writeStream = fs.createWriteStream('./public/sitemap.xml');

  writeStream.write(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`);

  const indexUrl = `<url>
<loc>${`https://heali.me`}</loc>
<lastmod>${format(new Date(), 'yyyy-MM-dd')}</lastmod>
<changefreq>weekly</changefreq>
</url>`;

  writeStream.write(indexUrl);
  console.log('Wrote index page');

  // Create site entries for lab results
  // Set lab results change frequency as daily
  // const exams = await fetchExams();
  const { data: exams } = await Axios.get('https://api.heali.me/exams');

  console.log('Fetched exams data');

  const locations = seoLocations;

  console.log('Fetched location data');

  const resultsUrls = exams
    .map(exam => {
      const parsedLocations = locations
        .map(location => {
          return `
        <url>
          <loc>https://heali.me/resultado/?slg[]=${encodeURIComponent(exam.slug)}&add=${encodeURIComponent(location.add)}&lat=${encodeURIComponent(location.lat)}&lng=${encodeURIComponent(location.lng)}</loc>
          <lastmod>${format(parseISO(exam.updated_date), 'yyyy-MM-dd')}</lastmod>
          <changefreq>daily</changefreq>
        </url>
      `;
        })
        .join('');
      return parsedLocations;
    })
    .join('');

  writeStream.write(resultsUrls);
  console.log('Wrote results page');

  // Create site entries for lab details
  // Set lab results change frequency as daily
  // const originalExams = await fetchAssociatedOriginalExams();
  const { data: originalExams } = await Axios.get(
    'https://api.heali.me/originalexams/associated',
  );

  console.log('Fetched original exams data');

  const detailsUrls = originalExams
    .map(originalExam => {
      return `
      <url>
        <loc>https://heali.me/${encodeURIComponent(originalExam.lab.slug)}/?slg[]=${encodeURIComponent(originalExam.exam.slug)}</loc>
        <lastmod>${format(parseISO(originalExam.updated_date), 'yyyy-MM-dd')}</lastmod>
        <changefreq>daily</changefreq>
      </url>
    `;
    })
    .join('');

  writeStream.write(detailsUrls);
  console.log('Wrote details page');

  writeStream.write(`</urlset>`);

  writeStream.end();

  const pipe = promisify(pipeline);

  const gzip = zlib.createGzip();
  const source = fs.createReadStream('./public/sitemap.xml');
  const destination = fs.createWriteStream('./public/sitemap.xml.gz');
  await pipe(source, gzip, destination);
})();
