import { AppShell, Button, Text, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { ScalerCalendar } from '@/components/ScalerCalendar/ScalerCalendar';

export function HomePage() {
  const [collapse, collapseHandler] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 500,
        breakpoint: 'sm',
        collapsed: { mobile: collapse, desktop: collapse },
      }}
      padding="md"
    >
      <AppShell.Header>
        <>
          <Flex
            justify="flex-start"
            align="center"
            direction="row"
            gap="lg"
          >
            <Text inherit variant="gradient" component="span" gradient={{ from: 'red', to: 'green' }}>ScalerAgency</Text>
            <Button onClick={() => collapseHandler.toggle()}>{collapse ? "Show calendar component" : "Hide calendar component"}</Button>
          </Flex>
        </>
      </AppShell.Header>
      <AppShell.Navbar>
        <ScalerCalendar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Welcome />
        <ColorSchemeToggle />
      </AppShell.Main>
    </AppShell>
  );
}
