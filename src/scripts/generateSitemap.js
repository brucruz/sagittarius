const { createWriteStream } = require('fs');
const { SitemapStream, EnumChangefreq } = require('sitemap');
const { createGzip } = require('zlib');
const { get } = require("axios");
const seoLocations = require('../contents/seoLocations.js');

async function generateSitemap() {
  try {
    const smStream = new SitemapStream({
      hostname: 'https://heali.me',
    });

    // const writeStream = createWriteStream(sitemapPath);
    const writeStream = createWriteStream('./public/sitemap.xml');

    smStream.pipe(writeStream);
    smStream.pipe(createGzip());
    // Add any static entries here
    smStream.write({
      url: '/',
      lastmod: process.env.siteUpdatedAt,
      changefreq: EnumChangefreq.WEEKLY,
    });

    // Create site entries for lab results
    // Set lab results change frequency as daily
    // const exams = await fetchExams();
    const { data: exams } = await get('https://api.heali.me/exams');

    console.log('Fetched exams data');

    const locations = seoLocations;

    console.log('Fetched location data');

    exams.map(exam => {
      locations.map(location => {
        smStream.write({
          url: `/resultado/?slg[]=${exam.slug}&add=${location.add}&lat=${location.lat}&lng=${location.lng}`,
          lastmod: exam.updated_date,
          changefreq: EnumChangefreq.DAILY,
        });

        return null;
      });

      return null;
    });

    console.log('Wrote lab results urls');

    // Create site entries for lab details
    // Set lab results change frequency as daily
    // const originalExams = await fetchAssociatedOriginalExams();
    const { data: originalExams } = await get('https://api.heali.me/originalexams/associated');

    console.log('Fetched original exams data');

    originalExams.map(originalExam => {
      smStream.write({
        url: `/${originalExam.lab.slug}/?slg[]=${originalExam.exam.slug}`,
        lastmod: originalExam.exam.updated_date,
        changefreq: EnumChangefreq.DAILY,
      });

      return null;
    });

    console.log('Wrote lab details urls');

    smStream.end();

    console.log('Ended write stream');
  } catch (e) {
    console.log(e);
  }
}

generateSitemap();
