// assets
import { StopOutlined, AccountBookOutlined } from '@ant-design/icons';
import GamesOutlinedIcon from '@mui/icons-material/GamesOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
// icons
const icons = {
  StopOutlined,
  AccountBookOutlined,GamesOutlinedIcon,SportsEsportsOutlinedIcon,CasinoOutlinedIcon
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const games = {
  id: 'game',
  title: 'Game',
  type: 'group',
  children: [
    {
      id: 'sfa-guess',
      title: 'SFA Guess',
      type: 'item',
      url: '/SFAgame',
      icon: icons.GamesOutlinedIcon
    },
    {
      id: 'teen-patti',
      title: 'Teen Patti',
      type: 'item',
      url: '/TeenPati',
      icon: icons.GamesOutlinedIcon
    },
    {
      id: 'fruit-slot',
      title: 'Fruit Slot',
      type: 'item',
      url: '/Fruitslot',
      icon: icons.SportsEsportsOutlinedIcon,
    },
    {
        id: '777',
        title: '777',
        type: 'item',
        url: '/TrippleSeven_Game',
        icon: icons.CasinoOutlinedIcon,
      }
  ]
};

export default games;
