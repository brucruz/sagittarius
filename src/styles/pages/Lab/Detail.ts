import device from '@/utils/devices';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.laptop} {
    flex-direction: row;
    margin: 128px 0;
    padding: 0 8.3%;
  }
`;

export const LabInfoContainer = styled.div`
  & > div:last-child {
    border: none;
  }
`

export const Content = styled.div`
  min-height: calc(100vh);
  margin: 64px 0;
  padding: 0 8.3%;

  @media ${device.laptop} {
    min-height: fit-content;
    margin: 0;
    padding: 0;
  }
`;

export const CompanyTitle = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 70px; 
    height: 70px;
  }

  h1 {
    font-size: 24px;
  }

  padding: 12px 0;
  border-bottom: 1px solid #BCC3D4;

  @media ${device.laptop} {
    border-bottom: none;
  } 
  
  & > div {
    margin-left: 12px;

    @media ${device.tablet} {
      margin-left: 24px;
      width: 100%;
      height: 70px;
      display: flex;
      align-items: center;
    }

    @media ${device.laptop} {
      padding: 12px 0;
      border-bottom: 1px solid #BCC3D4;
    }
  }
`;

export const BagContainer = styled.div`
  position: fixed;
  width: 100%;
  background: #fff;
  bottom: 32px;

  border: 1px solid #BCC3D4;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 12px 0;

  @media ${device.laptop} {
    position: relative;
    width: 60%;
    margin-left: 32px;
    bottom: 0;
    height: fit-content;
    background: #F0F6F9;
    padding: 0;
  }

  .total-price-bag-container, .footer-bag-container {
    padding: 0 16px !important;
  }

  .content-bag-container {

    .header-content-bag-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;

      @media ${device.laptop} {
        padding: 12px 16px;
        border-bottom: 1px solid #BCC3D4;
      }

    }

    span {
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: #3C4759;
    }

    button {
      background: rgba(188,195,212,0.3);
  
      height: 32px;
      width: 32px;
  
      border-radius: 50%;
      border: 0;
  
      margin-right: 12px;
      margin-top: 8px;
      margin-bottom: 8px;
  
      display: flex;
      align-items: center;
      justify-content: center;
  
      svg {
        color: #4D49C4;
        height: 20px;
        width: 20px;
      }

      @media ${device.laptop} {
        display: none;
      }
    }

    .list-exams {
      max-height: 200px !important;
      overflow-y: scroll;

      @media ${device.laptop} {
        background: #fff;
        width: 100% !important;
      }
    }

    .list-exams::-webkit-scrollbar {
      display: block !important;
    }

    .list-exams::-webkit-scrollbar-thumb {
      background-color: #247FA6;
    }

    .list-exams::-webkit-scrollbar {
      width: 9px;
    }
  }

  .total-price-bag-container {
    background: #F0F6F9;
    border-top: 1px solid #BCC3D4;
    border-bottom: 1px solid #BCC3D4;
    padding-top: 8px !important;
    padding-bottom: 8px !important;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 14px;
      font-weight: 700;
    }

    .content-price {
      span {
        font-size: 12px !important;
        font-weight: 400 !important;
      }

      h2 {
        font-size: 16px;
        margin-top: -8px;
      }
    }
  }

  .footer-bag-container {

    padding-top: 12px !important;

    button {
      padding: 16px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      img {
        margin-right: 16px;
      }
    }

    @media ${device.laptop} {
      background: #fff;
      width: 100% !important;

      padding: 12px 16px !important;
    }
  }
`

export const ExamContainer = styled.div`

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #BCC3D4;
    padding: 8px 16px 0 16px;


    span {
      font-size: 16px !important;
      min-width: fit-content;
    }

    label {
      font-weight: 700;
      width: 80%;
    }

    svg {
      height: 21px;
      width: 21px;
    }

    div {
      margin-left: 8px;
    }
  }

  & > div:last-child {
    border: none;
  }
`;

export const ModalMapContent = styled.div`
  display: flex;
  flex-direction: column;

  height: 80vh;

  & > div {
    padding: 12px 20px;
    height: 100%;
    width: 100%;
    display: block;
    border-radius: 0;
  }

  @media ${device.laptop} {
    height: 70vh;

    & > div {
      max-width: 100% !important;
    }
  }
`;  

export const ModalMapHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border: 1px solid #BCC3D4;
  
  span {
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.192941px;
    color: #4D49C4;
  }
  
  svg {
    fill: #BCC3D4;
    height: 20px;
    width: 20px;
  }
`;