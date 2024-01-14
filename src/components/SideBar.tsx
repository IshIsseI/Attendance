import { Box, Heading, Stack, Image, HStack, Divider } from '@chakra-ui/react';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SettingsIcon from '@mui/icons-material/Settings';
import MailIcon from '@mui/icons-material/Mail';
import { useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export const SideBar = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const isPageActive = (pagePath: string) => router.pathname === pagePath;

  const Logo = colorMode === 'dark' ? "/RoCall_Black.png" : "/RoCall.png";

  return (
    <Box w="250px" p={4} position="fixed" height="100%" className="sidebar">
      <Box margin={7} marginTop={10} marginBottom={10}>
          <Image onClick={() => router.push({pathname: '/',})} src={Logo} alt="logo" />
      </Box>

      <Divider />

      <Stack marginTop={5} marginLeft={5}>
        <Box margin={3}>
          <HStack onClick={() => router.push({pathname: '/SelectTime',})}>
            <EventSeatIcon style={{ verticalAlign: 'middle', color:!isPageActive('/StudentData') && !isPageActive('/TimeTable') && !isPageActive('/Setting') && !isPageActive('/Mail') && !isPageActive('/') || isPageActive('/') ? colorMode === 'light' ? 'black': 'white' : 'gray'}} />
              <Heading size="sm" verticalAlign="middle" color={!isPageActive('/StudentData') && !isPageActive('/TimeTable') && !isPageActive('/Setting') && !isPageActive('/Mail') && !isPageActive('/') || isPageActive('/')? colorMode === 'light' ? 'black': 'white' : 'gray'}>
                出席確認
              </Heading>
          </HStack>
        </Box>

        <Box margin={3}>
          <HStack onClick={() => router.push({pathname: '/StudentData',})}>
            <PersonIcon style={{ verticalAlign: 'middle', color:isPageActive('/StudentData') || isPageActive('/') ? colorMode === 'light' ? 'black': 'white' : 'gray' }} />
              <Heading size="sm" verticalAlign="middle" color={isPageActive('/StudentData') || isPageActive('/') ? colorMode === 'light' ? 'black': 'white' : 'gray'}>
                学生情報
              </Heading>
          </HStack>
        </Box>

        <Box margin={3}>
          <HStack onClick={() => router.push({pathname: '/TimeTable',})}>
            <EventNoteIcon style={{ verticalAlign: 'middle', color:isPageActive('/TimeTable') || isPageActive('/') ? colorMode === 'light' ? 'black': 'white' : 'gray' }} />
              <Heading size="sm" verticalAlign="middle" color={isPageActive('/TimeTable') || isPageActive('/') ? colorMode === 'light' ? 'black': 'white' : 'gray'}>
                時間割
              </Heading>
          </HStack>
        </Box>

        <Box margin={3}>
          <HStack onClick={() => router.push({pathname: '/Mail',})}>
            <MailIcon style={{ verticalAlign: 'middle', color:isPageActive('/Mail') || isPageActive('/') ? colorMode === 'light' ? 'black': 'white' : 'gray' }} />
              <Heading size="sm" verticalAlign="middle" color={isPageActive('/Mail') || isPageActive('/') ? colorMode === 'light' ? 'black': 'white' : 'gray'}>
                メール
              </Heading>
          </HStack>
        </Box>

        <Box margin={3}>
          <HStack onClick={() => router.push({pathname: '/Setting',})}>
            <SettingsIcon style={{ verticalAlign: 'middle', color:isPageActive('/Setting') || isPageActive('/') ? colorMode === 'light' ? 'black': 'white' : 'gray' }} />
              <Heading size="sm" verticalAlign="middle" color={isPageActive('/Setting') || isPageActive('/') ? colorMode === 'light' ? 'black': 'white' : 'gray'}>
                設定
              </Heading>
          </HStack>
        </Box>
      </Stack>
    </Box>
  );
};

export default SideBar;
