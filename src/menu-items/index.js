// project import
// import pages from './loginpage';
import dashboard from './dashboard';
import requests from './requests';
import accountStatus from './accountStatus';
import streamingDetail from './streamingDetail';
import resellerDetails from './resellerDetail';
import updateCoins from './updateCoin';
import appUserDetail from './appuserDetails';
import updateBeans from './add-deductBeans';
import updateFrame from './updateFrame';
import updateRides from './add-deductRIde';
import VideoRecord from './videoRecord';
import addDesignation from './add-designation';
import assignrole from './assign-role';
import games from './games';
import userReportfeedback from './userReport&feedback';
import withdrawRecord from './withdrawRecord';
import reports from './report';
import endUserStream from './end-userStream';
// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard,appUserDetail, requests, accountStatus,
    streamingDetail,resellerDetails,updateCoins,updateBeans,
    updateFrame,updateRides,VideoRecord,addDesignation,
    assignrole,games,withdrawRecord,reports, userReportfeedback,endUserStream
  ]
};

export default menuItems;
