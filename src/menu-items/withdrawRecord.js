// assets
import { StopOutlined, AccountBookOutlined } from '@ant-design/icons';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import WalletIcon from '@mui/icons-material/Wallet';
// icons
const icons = {
  StopOutlined,
  AccountBookOutlined,AccountBalanceOutlinedIcon,WalletIcon
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const withdrawRecord = {
  id: 'withdrawRecord',
  title: 'Withdraw Record',
  type: 'group',
  children: [
    {
      id: 'bank',
      title: 'Bank',
      type: 'item',
      url: '/BankWithdraw',
      icon: icons.AccountBalanceOutlinedIcon
    },
    {
      id: 'wallet',
      title: 'Wallet',
      type: 'item',
      url: '/WalletWithdraw',
      icon: icons.WalletIcon,
    },
  ]
};

export default withdrawRecord;
