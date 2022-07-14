import { MantineProvider } from '@mantine/core';
import { h } from 'preact';
import Zeepkist from './Zeepkist';

export function App() {
  return (
    <MantineProvider theme={{
      colorScheme: 'dark',
      fontFamily: 'Open Sans'
    }}>
      <Zeepkist />
    </MantineProvider>
  );
}