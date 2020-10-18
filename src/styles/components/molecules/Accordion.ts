import styled from 'styled-components';

export const AccordionButton = styled.button`
  color: #3c4759;
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0.8rem 0.6rem;
  width: 100%;
  text-align: left;
  border: none;
  border-bottom: 1px solid #bcc3d4;
  outline: none;
  transition: 0.4s;

  img {
    margin-left: 1.6rem;
    height: 16px;
    width: 16px;
  }
`;

export const AccordionPanel = styled.div.attrs(({ className }) => ({
  className,
}))`
  padding: 0;
  font-weight: 400;
  background-color: white;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease-out;
  color: #3c4759;

  p {
    margin: 1.2rem;
    line-height: 1.6rem;
    color: #444;
  }

  &.active {
    display: block !important;
    max-height: 100vh;
  }
`;
