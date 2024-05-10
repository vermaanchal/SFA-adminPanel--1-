// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    LoadingOutlined
  } from '@ant-design/icons';
  import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
  import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
  import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
  import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
  const icons = {
    DescriptionOutlinedIcon,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
    ContactPhoneOutlinedIcon,
    ReceiptLongOutlinedIcon ,ForwardToInboxOutlinedIcon };
  
  // ==============================|| MENU ITEMS - UTILITIES ||============================== //
  
  const reports = {
    id: 'reports',
    title: 'Reports',
    type: 'group',
    children: [
      {
        id: 'receiving-report',
        title: 'Receiving Report',
        type: 'item',
        url: '/ReceivingReport',
        icon: icons.ReceiptLongOutlinedIcon
      },
      {
        id: 'sending-report',
        title: 'Sending Report',
        type: 'item',
        url: '/SendingReport',
        icon: icons.ForwardToInboxOutlinedIcon
      },
    ]
  };
  
  export default reports;
  