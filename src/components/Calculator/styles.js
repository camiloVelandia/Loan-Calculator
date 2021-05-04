import styled from "styled-components";
import {  Button } from "@material-ui/core";

export const Section = styled.section`
  display: flex;
  width:80vw;
  background-color:#f2f2f2;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 25px;
  padding:90px 25px ;
  box-shadow: 1px 1px 15px 5px rgb(0 0 0 / 30%);
`;
export const Title = styled.h1`
  font-size:40px;
  text-transform:uppercase;
  margin:0;
  margin-bottom:30px;
`;
export const Error = styled.p`
  font-size:12px;
  margin:0;
  color:red;
  margin-top: 20px;
  margin-bottom: 20px;
`;
export const Form = styled.form`
  font-size:30px;
  margin:0;
  text-align:center;
  margin-bottom: 40px;
  width:400px;
  max-width:100%;
`;
export const ButtonStyled = styled(Button)`
  margin:0;
  margin-top: 40px;
`;
export const Result = styled.p`
  font-size: 20px;
  margin: 0;
  text-align: left;
  margin-bottom: 20px;
  font-weight: 700;
  & span {
    font-weight: 500;
    color: #3f51b5;
  }
`;
export const ToPay = styled.div`
  font-size: 30px;
  margin: 0;
  margin-top: 40px;
  & > div{
    margin-bottom:25px;
  }
`;
