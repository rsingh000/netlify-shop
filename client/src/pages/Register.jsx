import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive';
import { publicRequest } from '../requestMethods';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { login } from '../redux/apiCalls';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
        center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;

    ${mobile({ width: "75%"})}
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`;

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    &:disabled {
        cursor: not-allowed;
    }
`;

const Error = styled.span`
  color: red;
`;

const Register = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("")
    const [match, setMatch] = useState(true);

    useEffect(()=>{
        if(!(password===password1)){
            setMatch(false)
        }
    },[password, password1])
    

    useEffect(()=>{
        if((password===password1)){
            setMatch(true)
        }
    },[password, password1])

    const handleClick = (e) => {
        e.preventDefault();

        publicRequest.post("/auth/register", {
              username: username,
              email: email,
              password: password,
        });
        
        

        // eslint-disable-next-line no-restricted-globals
        if (confirm('Welcome to B. RAND! Enjoy the shopping')) {
            history.push("/");
            login(dispatch, {username, password});
          } else {
            // Do nothing!
          }
    }
    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="name" required />
                    <Input placeholder="last name" required />
                    <Input placeholder="username"  required onChange={(e)=>setUsername(e.target.value)}/>
                    <Input placeholder="email" required onChange={(e)=>setEmail(e.target.value)}/>
                    <Input placeholder="password" required type="password" onChange={(e)=>setPassword(e.target.value)}/>
                    <Input placeholder="confirm password" required type="password" onChange={(e)=>setPassword1(e.target.value)}/>
                    { !match && <Error>passwords do not match...</Error>}
                    <Agreement>
                        By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button disabled={!match} onClick={handleClick}>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register
