import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Awesome Web Scaffolding
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
