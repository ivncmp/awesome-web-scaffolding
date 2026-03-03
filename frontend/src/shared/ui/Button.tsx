import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';

interface Props extends MuiButtonProps {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: Readonly<Props>) {
  return <MuiButton {...props}>{children}</MuiButton>;
}
