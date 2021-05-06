import React from "react";
import Container from "@material-ui/core/Container";
import {
  Avatar,
  Menu,
  Popover,
  PersonIcon,
  Position,
  LogOutIcon,
} from "evergreen-ui";
import { auth } from "../firebase/Config";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const Navbar = () => {
  // log out
  const logout = () => auth.signOut();
  const { user } = useSelector((state) => state.user);
  const history = useHistory();
  return (
    <div className="w-full py-3 bg-white border-b-2 fixed top-0 left-0 z-50">
      <Container maxWidth="md">
        <div className="flex justify-between items-center">
          <div>
            <img
              src="/images/logo.png"
              alt="logo"
              className="h-7 cursor-pointer"
              onClick={() => history.push("/")}
            />
          </div>
          <div>
            <Popover
              position={Position.BOTTOM_LEFT}
              content={
                <Menu>
                  <Menu.Group>
                    <Menu.Item
                      icon={PersonIcon}
                      onClick={() => history.push(`/profile/${user.username}`)}
                    >
                      Profile
                    </Menu.Item>
                  </Menu.Group>
                  <Menu.Divider />
                  <Menu.Group>
                    <Menu.Item icon={LogOutIcon} intent="none" onClick={logout}>
                      Logout
                    </Menu.Item>
                  </Menu.Group>
                </Menu>
              }
            >
              <Avatar
                isSolid
                src={`${
                  user.username === null &&
                  "https://lh3.googleusercontent.com/proxy/PIrG2TcPcteBvrK_uRg8QvTyJ2h5hAF-YU4DxEFTpYkR1lbRV7to9k-HxCsIVpFMA0iXyMf7Atuns0VvUQ43Me4Z6jM1orNLyb35JkVOWkIqOK8gYZfSoObpMRF_UtElBex_0ZcgX-Lg-uXJqbEKhSr4YPN39EU__0XUiTdqRMIJp1PxxQeUtXXmrgsdhA"
                }`}
                name={user.username !== null && user.username}
                size={32}
                backgroundColor="#333"
                className="cursor-pointer"
              />
            </Popover>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
