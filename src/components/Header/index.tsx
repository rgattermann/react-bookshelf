import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import { Container, HeaderContainer, HeaderContent, Profile } from './styles';

import logoImg from '../../assets/logo.svg';
import { useAppDispatch } from '../../redux/hooks';
import { userNotAuthenticated } from '../../redux/auth';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleLogout = useCallback(() => {
    dispatch(userNotAuthenticated());
    history.push('/');
  }, [history, dispatch]);

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
              <span>Welcome,</span>
              <strong>Administrator</strong>
            </div>
          </Profile>

          <button type="button" onClick={handleLogout}>
            <FiPower title="Logout" />
          </button>
        </HeaderContent>
      </HeaderContainer>
    </Container>
  );
};
export default Header;
