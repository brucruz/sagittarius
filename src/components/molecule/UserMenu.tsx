import { useAuth } from "@/hooks/auth";
import { Container, MenuArrow, MenuHelloItem, MenuItem, MenuItems, OfflineUser, OnlineUserMenu, UserAvatarDummy, UserMenuContainer } from "@/styles/components/molecules/UserMenu";
import Link from "next/link";
import { useState } from "react";
import { MdPerson } from "react-icons/md";

const UserMenu = () => {
  const { user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Container>
      { !user && (
        <OfflineUser>
          <UserAvatarDummy>
            <MdPerson />
          </UserAvatarDummy>

          <p>Acessar</p>
        </OfflineUser>
      )
      }

      { !!user && (
        <OnlineUserMenu
          onBlur={() => setIsMenuOpen(false)}
        >
          <div>
            <UserAvatarDummy
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MdPerson />
            </UserAvatarDummy>

            <p>Olá, {user.first_name}</p>
          </div>

          {isMenuOpen && (
            <UserMenuContainer>
              <MenuArrow/>

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
  )
}

export default UserMenu;
