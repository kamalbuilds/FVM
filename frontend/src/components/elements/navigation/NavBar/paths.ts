import { ISubNav } from '../SubNav/SubNav';

const NAV_LINKS: ISubNav[] = [
  // { label: 'Home', href: '/' },
  {
    label: 'Transactions',
    href: '/transactions',
  },
  {
    label: 'Notifications',
    href: '/notifications',

  },
  {
    label: 'Balances',
    href: '/balances',
    children: [
      {
        label: 'ERC20',
        subLabel: 'Get your ERC20 balances',
        href: '/balances/erc20',
        logo: 'token',
      },
      {
        label: 'NFT',
        subLabel: 'Get your ERC721 an ERC1155 balances',
        href: '/balances/nft',
        logo: 'pack',
      },
    ],
  },
  {label: 'Miners', href: '/storageProviders'},
  {
    label: 'Proposal Marketplace',
    href: '/proposalMarketPlace',
    children: [
      {
        label: 'New Proposal',
        subLabel: 'Submit a new proposal to marketplace',
        href: '/proposalMarketPlace/newProposal',
      },
      {
        label: 'View Market Proposals',
        subLabel: 'View list of all marketplace proposals and bid on them',
        href: '/proposalMarketPlace/proposals',
      },
    ],
  },
];

export default NAV_LINKS;
