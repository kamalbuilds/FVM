import { useContext} from 'react'

import { ProposalCard } from 'components/modules/ProposalCard';
import { FormDataContext } from 'context';

const Proposals = () => {
  const { formCollectionData } = useContext<any>(FormDataContext);

  console.log("how many", formCollectionData);

  return (
    <>
     {formCollectionData?.length > 0 && formCollectionData.map((item: any, i: any) => (
      <div key={i}>
        <ProposalCard formCollectionData={item} id={i} />
      </div>
    ))}
    </>
  )
}
export default Proposals