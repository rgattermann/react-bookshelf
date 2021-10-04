import React, { useCallback } from "react";
import { FiPower } from "react-icons/fi";

import { Container, HeaderContainer, HeaderContent, Profile } from "./styles";

import logoImg from "../../assets/logo.svg";
import { useHistory } from 'react-router';
import { useAppDispatch } from '../../redux/hooks';
import { userNotAuthenticated } from '../../redux/auth';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

    const handleLogout = useCallback(() => {
      dispatch(userNotAuthenticated());
      history.push('/');
    }, []);

  return (
    <Container>
      <HeaderContainer>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img
              src="https://avatars.githubusercontent.com/rgattermann"
              alt="Admin"
            />
            <div>
              <span>Bem vindo,</span>
              <strong>Admin</strong>
            </div>
          </Profile>

          <button type="button" onClick={handleLogout}>
            <FiPower title="Logout"/>
          </button>
        </HeaderContent>
      </HeaderContainer>
    </Container>
  );
};
export default Header;
