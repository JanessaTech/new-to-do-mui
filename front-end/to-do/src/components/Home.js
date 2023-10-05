import { Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'

const drawerWidth = 240;

export default function Home() {

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
            <Typography>Welcome, Janessa</Typography>
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
        <Box sx={{m:1, width:`calc(100% - ${drawerWidth}px)`}}><Outlet /></Box>
    </Box>
  );
}


