import { CardContent, Typography } from '@mui/material';
import Card from '@/shared/ui/Card';
import type { ExampleItem } from '../example.types';

interface Props {
  item: ExampleItem;
}

export default function ExampleCard({ item }: Readonly<Props>) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {item.description}
        </Typography>
        <Typography variant="caption" color="text.disabled">
          {new Date(item.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
