import React, { useState } from 'react';
import { createStyles, Header, Container, Group, Burger, Paper, Transition, Text } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { ColorSchemeToggle } from './ColorSchemeToggle/ColorSchemeToggle';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useUser from '../hooks/useUser';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'fixed',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    marginRight: 50,
    marginLeft: 50,
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}));

interface HeaderResponsiveProps {
  links: { link: string; label: string; role: string }[];
}

export default function({ links }: HeaderResponsiveProps) {
  const Router = useRouter()
  const { isAuth, isAdmin, user } = useUser({redirect:false})
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [active, setActive] = useState(Router.pathname);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    link.role.includes(user.role) && (
    <Link  href={link.link} key={link.label} passHref>
    <a
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        toggleOpened(false);
        Router.push(link.link)
      }}
    >
      {link.label}
    </a>
    </Link>
    )

  ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <div className={classes.header}>
        <Link href={'/'}>
          <Text className='fw-bold' size='lg' variant='gradient'>
              YukPilih
          </Text>
        </Link>
        <Group spacing={5} className={classes.links}>
          {items}
          <ColorSchemeToggle />
        </Group>

        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
              <ColorSchemeToggle />
            </Paper>
          )}
        </Transition>
      </div>
    </Header>
  );
}