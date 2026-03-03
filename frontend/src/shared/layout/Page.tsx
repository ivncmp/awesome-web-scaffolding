import { Container, Box } from '@mui/material';

interface Props {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

export default function Page({ children, maxWidth = 'lg' }: Readonly<Props>) {
  return (
    <Container maxWidth={maxWidth}>
      <Box sx={{ py: 4 }}>{children}</Box>
    </Container>
  );
}
