// const Exam = require('@/@types/Exam');
// const OriginalExam = require('@/@types/OriginalExam');
const Axios = require('axios');
const fs = require('fs');

const globby = require('globby');
const prettier = require('prettier');
const seoLocations = require('../contents/seoLocations');

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');

  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    'pages/**/*{.js,.mdx}',
    '!pages/_*.js',
    '!pages/api',
  ]);

  // Create site entries for lab results
  // Set lab results change frequency as daily
  // const exams = await fetchExams();
  const { data: exams } = await Axios.get('https://api.heali.me/exams');

  console.log('Fetched exams data');

  const locations = seoLocations;

  console.log('Fetched location data');

  // Create site entries for lab details
  // Set lab results change frequency as daily
  // const originalExams = await fetchAssociatedOriginalExams();
  const { data: originalExams } = await Axios.get(
    'https://api.heali.me/originalexams/associated',
  );

  console.log('Fetched original exams data');

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map(page => {
                const path = page
                  .replace('pages', '')
                  .replace('.js', '')
                  .replace('.mdx', '');
                const route = path === '/index' ? '' : path;

                return `
                        <url>
                          <loc>${`https://heali.me${route}`}</loc>
                          <lastmod>${process.env.siteUpdatedAt}</lastmod>,
                          <changefreq>weekly</changefreq>
                        </url>
                    `;
              })
              .join('')}

            ${exams.map(exam => {
              locations.map(location => {
                return `
                  <url>
                    <loc>${`https://heali.me/resultado/?slg[]=${exam.slug}&add=${location.add}&lat=${location.lat}&lng=${location.lng}`}</loc>
                    <lastmod>${process.env.siteUpdatedAt}</lastmod>,
                    <changefreq>weekly</changefreq>
                  </url>
                `;
              });
            })}

            ${originalExams.map(originalExam => {
              return `
                <url>
                  <loc>${`https://heali.me/${originalExam.lab.slug}/?slg[]=${originalExam.exam.slug}`}</loc>
                  <lastmod>${process.env.siteUpdatedAt}</lastmod>,
                  <changefreq>weekly</changefreq>
                </url>
              `;
            })}
        </urlset>
    `;

  // If you're not using Prettier, you can remove this.
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  fs.writeFileSync('public/sitemap.xml', formatted);
})();
