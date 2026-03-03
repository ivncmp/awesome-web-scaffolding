import { Typography } from '@mui/material';
import Page from '@/shared/layout/Page';
import ExampleList from '../components/ExampleList';
import { useExample } from '../hooks/useExample';

export default function ExamplePage() {
  const { data, isLoading, error } = useExample();

  return (
    <Page>
      <Typography variant="h3" component="h1" gutterBottom>
        Example Page
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        This is a demo page showcasing the feature-based architecture with
        TanStack Query, Material-UI, and Supabase Edge Functions.
      </Typography>
      <ExampleList
        items={data?.items || []}
        isLoading={isLoading}
        error={error}
        message={data?.message}
      />
    </Page>
  );
}
