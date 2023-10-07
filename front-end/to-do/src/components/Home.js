import { Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import {Navigate} from "react-router-dom";
import { useOutlet } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'

const drawerWidth = 240;
const UserContext = React.createContext({})
export {UserContext}

export default function Home() {
  const outlet = useOutlet()
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user')
  const [user, setUser] = React.useState(userStr ? JSON.parse(userStr) : null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('user')
    navigate('/login')
  }
 return (
    <Box sx={{display:'flex'}}>
          <CssBaseline />
          <Drawer
              sx={{
              width: drawerWidth,
              flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
              variant="permanent"
              anchor="left"
          >
            <Toolbar>
              <Typography>Hi, <strong style={{color:'red'}}>{user?.name}</strong></Typography>
            </Toolbar>
            <Divider />
            <List>
              <ListItem>
                <ListItemButton component={Link} to='profile' disableRipple selected={selectedIndex === 0} onClick={ () => setSelectedIndex(0)}>
                  <ListItemIcon>
                    <PersonOutlineOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Profile' />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton component={Link} to='todo' disableRipple selected={selectedIndex === 1} onClick={ () => setSelectedIndex(1)}>
                  <ListItemIcon>
                    <FormatListBulletedOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Todos' />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton disableRipple >
                  <ListItemIcon>
                    <LogoutIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Logout' onClick={ handleLogout}/>
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
          <Box sx={{m:1, width:`calc(100% - ${drawerWidth}px)`}}>
            <UserContext.Provider value={user}>
              {outlet}
            </UserContext.Provider>
          </Box>
    </Box>
        
 )
  
}


