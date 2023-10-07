import { Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import {Navigate} from "react-router-dom";
import { useOutlet } from 'react-router-dom'

const drawerWidth = 240;
const UserContext = React.createContext({})
export {UserContext}

export default function Home() {
  const outlet = useOutlet()
  const userStr = localStorage.getItem('user')
  const [user, setUser] = React.useState(userStr ? JSON.parse(userStr) : null)
  if (user) {
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
            <ListItemButton component={Link} to='profile' disableRipple>
              <ListItemIcon>
                <PersonOutlineOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary='Profile' />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link} to='todo' disableRipple>
              <ListItemIcon>
                <FormatListBulletedOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary='Todos' />
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
  } else {
    return <Navigate to="/login" replace={true} />
  }
  
}


