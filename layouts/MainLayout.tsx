import React, { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import HeaderComponent from '../components/HeaderComponent';
import { links } from '../config/config';
import { useRouter } from 'next/router';
import useUser from '../hooks/useUser';
import NavbarComponent from '../components/NavbarComponent';


export default function({children}) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      header={
        <HeaderComponent links={links} />
      }

      navbar={
        <NavbarComponent />
      }
    >
        {children}
    </AppShell>
  );
}