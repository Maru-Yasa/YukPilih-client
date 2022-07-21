import React, { useEffect, useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Group, Text } from '@mantine/core';
import {
  Icon as TablerIcon,
  Home2,
  Gauge,
  DeviceDesktopAnalytics,
  Fingerprint,
  CalendarStats,
  User,
  Settings,
  Logout,
  SwitchHorizontal,
  Versions,
} from 'tabler-icons-react';
import { useRouter } from 'next/router';
import useUser from '../hooks/useUser';
import Dashboard from './Welcome/admin/Dashboard';

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" withArrow transitionDuration={0}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        <Icon />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: Gauge, label: 'Dashboard' },
//   { icon: DeviceDesktopAnalytics, label: 'Poll' },
  { icon: CalendarStats, label: 'Polls' },
  { icon: User, label: 'Users' },
  { icon: Versions, label: 'Devisions' },
  { icon: Settings, label: 'Settings' },
];

const adminPage = [
    '/admin',
    '/admin/devisions',
    '/admin/polls',
    '/admin/users'
]

export default function() {
  const Router = useRouter()
  const [active, setActive] = useState(2);
  const [page, setPage] = useState(Router.query.page || '')
  const { isAdmin } = useUser({})

  useEffect(() => {
    console.log(page);
    
  }, [page])

  const handleNavbarClick = (index: number, link: string) => {
    setActive(index)
    setPage(link.toLocaleLowerCase())
    Router.push(`/admin/${link.toLocaleLowerCase()}`)
  }

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => handleNavbarClick(index, link.label)}
    />
  ));

  return (
    <>
    {isAdmin && Router.pathname.includes(adminPage) ? (<>
         <Navbar height={750} width={{ base: 80 }} className="h-100" p="md">
        <Navbar.Section grow mt={0}>
            <Group direction="column" align="center" spacing={0}>
            {links}
            </Group>
        </Navbar.Section>
        <Navbar.Section>
            <Group direction="column" align="center" spacing={0}>
            <NavbarLink icon={Logout} label="Logout" />
            <NavbarLink icon={SwitchHorizontal} label="Change account" />
            </Group>
        </Navbar.Section>
        </Navbar> 
    </>):(<>
        


    </>)}
    </>
  );
}