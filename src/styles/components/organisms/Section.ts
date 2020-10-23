import styled from "styled-components";
import devices from '@/utils/devices';

export const Container = styled.section`
  margin-top: 74px;
  margin-bottom: 60px;
  margin-left: 25px;
  margin-right: 25px;

  h2 {
    margin-bottom: 32px;
  }

  @media ${devices.tablet} {
    margin-left: 8.3%;
    margin-right: 8.3%;

    h2 {
      text-align: center;
      font-size: 32px;
      margin-bottom: 64px;
    }

    div.items-div {
      display: flex;
      text-align: center;
      justify-content: space-between;
    }
  }
`;

export const SectionItem = styled.article`
  display: flex;
  align-items: center;

  & + article {
    margin-top: 32px;
  }

  @media ${devices.tablet} {
    flex-direction: column;
    max-width: 150px;
  }

  @media ${devices.laptop} {
    max-width: 250px;
  }

  @media ${devices.laptopL} {
    max-width: 300px;
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

  @media ${devices.tablet} {
    height: auto;
    width: auto;
    margin-right: 0;
    margin-bottom: 24px;
  }
`;

export const SectionItemText = styled.div`
  h3 {
    margin-bottom: 6px;
  }

  @media ${devices.tablet} {
    h3 {
      font-size: 20px;
    }

    p {
      font-size: 14px;
    }
  }
`;
