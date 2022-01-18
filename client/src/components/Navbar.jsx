import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import {mobile} from '../responsive'
import { useSelector, useDispatch } from "react-redux"
import { Link, useHistory } from 'react-router-dom';
import { resetProduct } from '../redux/cartRedux';
import { loginReset } from '../redux/userRedux';

const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px"})}
`;
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px"})}

`;
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none"})}
`;

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;

const Input = styled.input`
    border: none;

    ${mobile({ width: "50px"})}

`

const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.h1`
    font-weight: bold;

    ${mobile({ fontSize: "16px"})}

`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-decoration: none;

    ${mobile({ flex: 2, justifyContent: "Center"})}

`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px"})}

`


const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity);
    const user = useSelector(state => state.user.currentUser);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogOut = (e) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure want to log out?')) {
            dispatch(resetProduct());
            dispatch(loginReset());
            history.push("/");
          } else {
            // Do nothing!
            history.push("/");
          }
        history.push("/");
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>
                        EN
                    </Language>
                    <SearchContainer>
                        <Input placeholder="Search"/> 
                        <Search style={{color: "gray", fontSize: 16}}/>
                    </SearchContainer>
                </Left>
                <Center><Logo>B. RAND.</Logo></Center>
                <Right>
                    { user && 
                        <Link to="/" style={{textDecoration: "none", color:"black"}} onClick={handleLogOut}>
                        <MenuItem >Logout</MenuItem>
                    </Link>
                    } 
                    { !user &&
                        <>
                            <Link to="/register" style={{ textDecoration: "none", color: "black" }}>
                                <MenuItem>Register</MenuItem>
                            </Link>
                            <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
                                <MenuItem>Login</MenuItem>
                            </Link>
                        </>
                    }
                    <Link to="/cart" style={{textDecoration: "none", color:"black"}}>
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined/>
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper> 
        </Container>
    )
}

export default Navbar
