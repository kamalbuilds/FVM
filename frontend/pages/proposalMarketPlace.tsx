import { Default } from 'components/layouts/Default';
import { ProposalCard } from 'components/modules/ProposalCard';
import { Proposals } from 'components/temp';
const ProposalMarketPlace = () => {


 return (
    <Default pageName="proposalMarketPlace">
      {/* <ProposalCard key={5} id='1' error={undefined} /> */}
      <Proposals />
    </Default>
  );
};

export default ProposalMarketPlace;
