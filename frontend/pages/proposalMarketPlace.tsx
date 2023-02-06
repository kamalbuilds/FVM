import { Default } from '../src/components/layouts/Default';
import { ProposalCard } from '../src/components/modules/ProposalCard';
import { Proposals } from '../src/components/temp';
const ProposalMarketPlace = () => {


 return (
    <Default pageName="proposalMarketPlace">
      {/* <ProposalCard key={5} id='1' error={undefined} /> */}
      <Proposals />
    </Default>
  );
};

export default ProposalMarketPlace;
