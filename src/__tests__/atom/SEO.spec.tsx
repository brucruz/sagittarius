/* eslint-disable react/display-name */
import { waitFor, render, getByTestId } from '@testing-library/react';
import SEO from '@/components/atom/SEO';

import '@testing-library/jest-dom';

interface SEOTestProps {
  title: string;
  description?: string;
  image?: string;
  shouldExcludeTitleSuffix?: boolean;
  shouldIndexPage?: boolean;
}

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe('<SEO />', () => {
  it('Should render SEO component', async () => {
    render(<SEO title="Home Page" />, {
      container: document.head,
    });

    expect(document.title).toBe('Home Page | Heali');
  });

  it('Should render meta to not index page', () => {
    render(<SEO title="Home Page" shouldIndexPage={false} />, {
      container: document.head,
    });

    const meta = getByTestId(document.head, 'seo-index-page');

    expect(document.head).toContainElement(meta);
  });

  it('Should render meta to image', () => {
    render(<SEO title="Home Page" image="www.urlhere.com" />, {
      container: document.head,
    });

    const meta = getByTestId(document.head, 'seo-image');

    expect(document.head).toContainElement(meta);
  });

  it('Should render meta to description', () => {
    render(<SEO title="Home Page" description="Description here" />, {
      container: document.head,
    });

    const meta = getByTestId(document.head, 'seo-description');

    expect(document.head).toContainElement(meta);
  });
});
