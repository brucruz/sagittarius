interface HighlightResultProps {
  fullyHighlighted: boolean;
  matchLevel: boolean;
  matchedWord: string[];
  value: string[];
}

export default interface ExamSearchResult {
  title: string;
  slug: string;
  alternative_titles: string[];
  highlightResult: {
    alternative_titles: HighlightResultProps[];
    title: HighlightResultProps;
  };
  created_date: string;
  updated_date: string;
}
