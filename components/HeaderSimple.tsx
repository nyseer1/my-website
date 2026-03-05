"use client"; // This is a client component 👈🏽
// import { useState } from 'react';
import { Burger, Button,  Container, Group, MantineProvider, createTheme, Title, Menu, AppShell} from '@mantine/core';
import { useDisclosure, useHeadroom} from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './HeaderSimple.module.css';
// import Link from 'next/link';

import {
  IconPhoto,
  IconArrowsLeftRight,
} from '@tabler/icons-react';
const links = [
  { link: '/', label: 'Home' },
  { link: '#about-section', label: 'About Me' },
  { link: '#project-section', label: 'Projects' },
  { link: '#skills-section', label: 'Skills' },
  { link: '#contact-section', label: 'Hire Me' },
];

const theme = createTheme({
  fontFamily: 'Verdana, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: 'Outfit, sans-serif' },
});



export function HeaderSimple() {

  // this initializes the headroom for navbar
  const pinned = useHeadroom({ fixedAt: 100 }); 

  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      
    >
      {link.label}
    </a>
  ));

  return (
    <div>
        <br/>
        <Container size="md" className={classes.inner}>
          
          {/* if scrolling the specified amount of pixels, it will show the navbar */}
          <AppShell header={{ height: 80, collapsed: !pinned, offset: false }}>
            <AppShell.Header style={{ transform: `translate3d(0, ${pinned ? 0 : -80}px, 0)`, transition: 'transform 400ms ease' }}>
              <div className='bar'>
                <br/>
              </div>
              {/* groups the logo and buttons together, they each need their own group to justify in different variations */}
              <Group gap={5} justify="space-around">
                <Group gap={5} visibleFrom="xs" justify="flex-start">
                  <MantineProvider theme={theme}>
                    <Button variant="transparent" size="lg" color='black' component="a" href="/"><Title>Nyseer<span style={{ color: 'blue' }}>.</span></Title></Button>
                  </MantineProvider>
                </Group>
                
                <Group gap={5} visibleFrom="lg" justify="flex-end">
                  {items}
                </Group>


                {/* Menu burger - only visible on size smaller than specified screen size in hiddenFrom= */}
                <Menu shadow="md" width={200} transitionProps={{ transition: 'rotate-right', duration: 150 }}>
                  <Menu.Target>
                    <Burger
                      opened={opened}
                      onClick={toggle}
                      hiddenFrom="lg"
                      size="sm"
                      aria-label="Toggle navigation"
                    />
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>General</Menu.Label>
                    <Menu.Item>
                      {items}
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Label>Projects</Menu.Label>
                    <Menu.Item
                      leftSection={<IconArrowsLeftRight size={14} />}
                    >
                      Database
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconPhoto size={14} />}
                    >
                      ML
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>


              </Group>

              
              
            </AppShell.Header>
          </AppShell>

          
        </Container>

        <br/><br/><br/><br/><br/><br/>

    </div>
  );
}