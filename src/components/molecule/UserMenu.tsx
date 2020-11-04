import { useAuth } from '@/hooks/auth';
import {
  Container,
  MenuArrow,
  MenuHelloItem,
  MenuItem,
  MenuItems,
  OfflineUser,
  OnlineUserMenu,
  UserAvatar,
  UserMenuContainer,
} from '@/styles/components/molecules/UserMenu';
import Link from 'next/link';
import { useState } from 'react';
import { MdPerson } from 'react-icons/md';

const UserMenu = () => {
  const { user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Container>
      {!user && (
        <Link href="/login">
          <OfflineUser>
            <UserAvatar>
              <MdPerson />
            </UserAvatar>

            <p>Acessar</p>
          </OfflineUser>
        </Link>
      )}

      {!!user && (
        <OnlineUserMenu onBlur={() => setIsMenuOpen(false)}>
          <div>
            <UserAvatar onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.first_name} />
              ) : (
                <MdPerson />
              )}
            </UserAvatar>

            <p>Olá, {user.first_name}</p>
          </div>

          {isMenuOpen && (
            <UserMenuContainer>
              <MenuArrow />

              <MenuItems>
                <MenuHelloItem>
                  <p>Olá, {user.first_name}</p>
                </MenuHelloItem>

                <MenuItem>
                  <Link href="">
                    <p>Minha Conta</p>
                  </Link>
                </MenuItem>

                <MenuItem>
                  <Link href="">
                    <p>Meus Pedidos</p>
                  </Link>
                </MenuItem>

                <MenuItem>
                  <button type="button">
                    <p>Sair</p>
                  </button>
                </MenuItem>
              </MenuItems>
            </UserMenuContainer>
          )}
        </OnlineUserMenu>
      )}
    </Container>
  );
};

export default UserMenu;
