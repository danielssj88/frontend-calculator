import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function MenuBar({logout}) {
  const auth = true;
  const [anchorMainEl, setAnchorMainEl] = React.useState(null);
  const [anchorUserEl, setAnchorUserEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMainMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMainEl(event.currentTarget);
  };

  const handleCloseMain = () => {
    setAnchorMainEl(null);
  };

  const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorUserEl(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorUserEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-controls="main-menu-appbar"
            onClick={handleMainMenu}
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorMainEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorMainEl)}
            onClose={handleCloseMain}
          >
            <MenuItem onClick={() => {
              handleCloseMain()
              navigate('/calculator')
            }}>Calculator</MenuItem>
            <MenuItem onClick={() => {
              handleCloseMain()
              navigate('/user-records')
            }}>User Records</MenuItem>
          </Menu>
          <Typography style={{ cursor: 'pointer' }} variant="h6" component="div" sx={{ flexGrow: 1 }} onClick = {() => {
            navigate('/');
          }}>
            Calculator
          </Typography>
          {auth && (
            <div>
              {localStorage.getItem('username')}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="user-menu-appbar"
                aria-haspopup="true"
                onClick={handleUserMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorUserEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorUserEl)}
                onClose={handleCloseUser}
              >
                <MenuItem onClick={() => {
                  logout();
                  handleCloseUser();
                }}>logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
