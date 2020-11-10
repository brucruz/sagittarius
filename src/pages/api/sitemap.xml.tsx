import seoLocations from '@/contents/seoLocations';
import fetchAssociatedOriginalExams from '@/scripts/fetchAssociatedOriginalExams';
import fetchExams from '@/scripts/fetchExams';
import { NextApiRequest, NextApiResponse } from 'next';
import { SitemapStream, streamToPromise, EnumChangefreq } from 'sitemap';
import { createGzip } from 'zlib';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    // Set response header
    res.setHeader('content-type', 'application/xml');
    res.setHeader('Content-Encoding', 'gzip');

    // A Transform for turning a Readable stream of either SitemapItemOptions or url strings into a Sitemap.
    // The readable stream it transforms must be in object mode.
    const smStream = new SitemapStream({
      hostname: 'https://heali.me',
    });

    const pipeline = smStream.pipe(createGzip());
    // Add any static entries here
    smStream.write({
      url: '/',
      lastmod: process.env.siteUpdatedAt,
      changefreq: EnumChangefreq.WEEKLY,
    });

    // Create a sitemap.xml for lab results
    // Set lab results change frequencey is daily
    const exams = await fetchExams();
    const locations = seoLocations;

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

    // Create a sitemap.xml for lab details
    // Set lab results change frequencey is daily
    const originalExams = await fetchAssociatedOriginalExams();

    originalExams.map(originalExam => {
      smStream.write({
        url: `/${originalExam.lab.slug}/?slg[]=${originalExam.exam.slug}`,
        lastmod: originalExam.exam.updated_date,
        changefreq: EnumChangefreq.DAILY,
      });

      return null;
    });
    smStream.end();

    // cache the response
    // streamToPromise.then(sm => sitemap = sm)
    streamToPromise(pipeline);
    // stream the response
    pipeline.pipe(res).on('error', e => {
      throw e;
    });
  } catch (e) {
    res.status(500).end();
  }
};
