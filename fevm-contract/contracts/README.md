DATADAO contract Information 

1. The contract inherits from the DataDAOCore contract which is responsible for the interactions with the Filecoin Network.
2. The contract inherits from the AccessControl contract which is responsible for the interactions with the DAO members and assigning an admin to it.
3. The contract implements the IDataDAO interface. This interface defines the functions which are used to manage the data stored by the DAO.
4. The deals mapping is used to store the details of the deal proposals. This mapping is used to retrieve the deal details when a user wants to access the data.
5. The cidProviders mapping is used to store the details of the providers who are storing the data in the Filecoin Network. This mapping is used to check if a provider is already storing the data.
6. The addUser function is used to add a user to the DAO. Only the admins can add users to the DAO.
7. The createDealProposal function is used to create a deal proposal. This function is called by the members of the DAO.
8. The approveOrRejectDealProposal function is used to approve or reject a deal proposal. This function is called by the admins of the DAO.
9. The activateDeal function is used to activate a deal. This function is called by the provider who is storing the data.
10. The policyOK function is used to check if the provider is already storing the data.
11. The authorizeDealData function is used to authorize the deal data. This function is called by the activateDeal function to authorize the deal data.
12. The getDealState function is used to get the current state of the deal. 

Interface for DATADAO 

1. The interface is called IDataDAO.
2. The error messages are defined for the contract.
3. The enum DealState is defined with the following states:
a. Proposed: When a deal is proposed.
b. Passed: When a deal is passed by the Data DAO.
c. Rejected: When a deal is rejected by the Data DAO.
d. Active: When a deal is activated.
e. Expired: When a deal is expired.
4. The struct Deal is defined with the following parameters:
a. proposedBy: The address of the person who proposed the deal.
b. cidraw: The cid of the deal.
c. size: The size of the deal.
d. storageFees: The storage fees for the deal.
e. dealStartBlockStamp: The timestamp when the deal will be activated.
f. dealDurationInDays: The number of days for which the deal will be active.
g. dealState: The state of the deal.
5. The events are defined for the contract.
6. The function getDealState is defined. This function will return the state of the deal.