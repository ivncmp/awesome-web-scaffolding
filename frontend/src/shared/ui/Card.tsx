import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';

interface Props extends MuiCardProps {
  children: React.ReactNode;
}

export default function Card({ children, ...props }: Readonly<Props>) {
  return <MuiCard {...props}>{children}</MuiCard>;
}
