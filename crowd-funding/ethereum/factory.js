import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xA70bC876C7E6489D9DcAB2E63BCd4b76380054e2'
);

export default instance;
