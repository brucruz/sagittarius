import device from '@/utils/devices';
import styled from 'styled-components';

export const Container = styled.div`
  margin: 64px 0;
  padding: 0 24px;

  h1 {
    font-size: 24px;
    margin-bottom: 16px;
  }

  @media ${device.laptop} {
    display: flex;
    justify-content: space-between;
    margin-top: 128px;
    padding: 0 8.3%;
  }
`;

export const Content = styled.div`
  @media ${device.laptop} {
    max-width: 49%;
    width: 100%;
  }
`;

export const Card = styled.div`
  border: 1px solid #BCC3D4;
  box-sizing: border-box;
  border-radius: 6px;
  background: #f2f3f6;

  @media ${device.laptop} {
    display: flex;
    justify-content: space-between;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background: #fff;
  height: 100px;
  
  img {
    max-width: 80px;
  }

  @media ${device.laptop} {
    padding: 0;
    align-items: normal;
    height: auto;
    width: 69%;

    .img-div {
      background: #f2f3f6;
      width: 100px;
      display: flex;
      align-items: center;

      img {
        width: 100%;
        margin: auto;
      }
    }
  }
`

export const HeaderInfo = styled.div`
  margin-left: 16px;

  h2 {
    font-size: 14px;
    line-height: 18px;
    width: 150px;
  }

  @media ${device.laptop} {
    display: flex;
    flex-direction: column;
    margin: auto 0;

    h2 {
      max-width: 280px;
      width: 100%;
      margin-left: 8px;
    }
  }
`;

export const Stars = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;

  & > span {
    margin-left: 8px;
    font-weight: 700;
  }

  & > span span {
    font-weight: 400;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 8px 16px;

  .amount-exams {
    font-size: 12px;
    font-weight: 700;
  }

  button {
    text-transform: uppercase;
    background: #4D49C4;
    border: 1px solid #7773FF;
    box-sizing: border-box;
    border-radius: 4px;
    color: #fff;
    padding: 4px 12px;
    font-size: 12px;
  }

  @media ${device.laptop} {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;

export const Price = styled.div`
  h2 {
    font-size: 16px;
  }

  span {
    display: flex;
    color: #247FA6;
    font-size: 13px;
    font-weight: 700;
    margin-top: -6px;
    margin-bottom: 8px;
  }

`;

export const LabResultList = styled.div`
  .card {
    margin-bottom: 16px;
  }

  @media ${device.laptop} {
    max-height: 550px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

