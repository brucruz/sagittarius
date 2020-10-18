import styled from "styled-components";

export const Container = styled.section`
  margin-top: 60px;
  margin-bottom: 60px;
  margin-left: 25px;
  margin-right: 25px;

  h2 {
    margin-bottom: 32px;
  }
`;

export const SectionItem = styled.article`
  display: flex;
  align-items: center;

  & + article {
    margin-bottom: 32px;
  }
`;

export const SectionItemImg = styled.div`
  height: 96px;
  width: 96px;

  margin-right: 25px;

  flex: 1 0 auto;

  img {
    height: 100%;
    width: 100%;
  }
`;

export const SectionItemText = styled.div`
  h3 {
    margin-bottom: 6px;
  }
`;
