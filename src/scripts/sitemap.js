// const Exam = require('@/@types/Exam');
// const OriginalExam = require('@/@types/OriginalExam');
const fs = require('fs');

const Axios = require('axios');
const seoLocations = require('../contents/seoLocations');

(async () => {
  const writeStream = fs.createWriteStream('./public/sitemap.xml');

  writeStream.write(`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  `);

  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    'pages/**/*{.js,.mdx}',
    '!pages/_*.js',
    '!pages/api',
  ]);

  const indexUrl = `
    <url>
      <loc>${`https://heali.me`}</loc>
      <lastmod>${new Date()}</lastmod>,
      <changefreq>weekly</changefreq>
    </url>
  `;

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
          <loc>${`https://heali.me/resultado/?slg[]=${exam.slug}&add=${location.add}&lat=${location.lat}&lng=${location.lng}`}</loc>
          <lastmod>${exam.updated_date}</lastmod>,
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
        <loc>${`https://heali.me/${originalExam.lab.slug}/?slg[]=${originalExam.exam.slug}`}</loc>
        <lastmod>${originalExam.updated_date}</lastmod>,
        <changefreq>daily</changefreq>
      </url>
    `;
    })
    .join('');

  writeStream.write(detailsUrls);
  console.log('Wrote details page');

  writeStream.write(`</urlset>`);

  // const sitemap = `
  //       <?xml version="1.0" encoding="UTF-8"?>
  //       <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  //         ${pagesUrls}
  //         ${resultsUrls}
  //         ${detailsUrls}
  //       </urlset>
  //   `;

  // // If you're not using Prettier, you can remove this.
  // const formatted = prettier.format(sitemap, {
  //   ...prettierConfig,
  //   parser: 'html',
  // });

  // await fs.writeFileSync('public/sitemap.xml', formatted);
})();
