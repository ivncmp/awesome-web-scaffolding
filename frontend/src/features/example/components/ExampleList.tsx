import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import ExampleCard from './ExampleCard';
import type { ExampleItem } from '../example.types';

interface Props {
  items: ExampleItem[];
  isLoading: boolean;
  error: Error | null;
  message?: string;
}

export default function ExampleList({
  items,
  isLoading,
  error,
  message,
}: Readonly<Props>) {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error: {error.message}
      </Alert>
    );
  }

  return (
    <Box>
      {message && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}
      {items.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center">
          No items found
        </Typography>
      ) : (
        items.map((item) => <ExampleCard key={item.id} item={item} />)
      )}
    </Box>
  );
}
