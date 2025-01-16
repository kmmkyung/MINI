import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 420px;
  width: 100%;
  padding: 50px 0;
`;

export const Title = styled.h1`
  font-size: clamp(2.6rem, 4vw, 4rem);
`;

export const Form = styled.form`
  margin: 50px 0 10px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  `;

export const Input = styled.input`
  padding: 15px 20px;
  border-radius: 50px;
  border:none;
  width: 100%;
  font-size: clamp(1.4rem, 2vw, 1.6rem);
  transition: all 0.4s;

  &[type='submit']{
    cursor: pointer;
    background-color: #1d9bf0;
    &:hover{
    opacity:0.8
    }
  }
`;

export const Error = styled.span`
  font-weight: 600;
  font-size: clamp(1.2rem, 1.2vw, 1.4rem);
  color: tomato;
  padding: 10px;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  font-size: clamp(1.2rem, 1.2vw, 1.4rem);
  color: #fff;
  
  a {
  color: #1d9bf0;
  }
`;