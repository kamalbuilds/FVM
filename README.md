# Marketplace for storage on top of  FVM

## Deployments 

Spheron - https://fvm-293b6e.spheron.app/
Vercel - https://fvm-storage-bounty.vercel.app/

The Smart Contract code for this project could be found here - https://github.com/legendarykamal/FVM-Contract 

For an indepth video explaination of the platform refer - https://youtu.be/VsRXHH8vJl0

## Features

1> Building a platform where Clients would list Storage bounties and where storage providers compete to win deals, bringing the price down for clients.

🛠 Discovery tools: Best use of FVM to improve transparency around Filecoin economy participants (e.g., storage providers, storage clients etc.).

![Screenshot_20230207_000455](https://user-images.githubusercontent.com/95926324/217153358-49606b15-891c-4122-8d5a-55d8634305f1.png)


2> Push Protocol is used to notify the Users on the platform 

![image](https://user-images.githubusercontent.com/95926324/217152782-60a3d63c-e5f9-4f77-8432-64fa2bff4e81.png)

Client - Get Notified as soon as a provider places a bid for your proposal .
SP - Get notified as soon as your bid gets accepted.

3> Huddle01 Tokengated secured meetups to understand better befor the final deal between client and the Providers.

![image](https://user-images.githubusercontent.com/95926324/217154168-b06ceba5-7f2f-44e0-8a24-6e61b8295f25.png)

4> Storage Providers/ Miners can place their bid for the project 
![Screenshot_20230207_102149](https://user-images.githubusercontent.com/95926324/217153076-4a82a4a2-6d30-4a44-bf0a-a355135eb085.png) 

## The Flow of the project

<p align="center">
  <img src="https://user-images.githubusercontent.com/95926324/217155856-c50de29e-da83-44f1-94ae-b03921c991dc.png">
</p>


1> Client comes and creates a proposal for his needs on the platform and locks funds in it.

2> All the Proposals are listed on the Marketplace.

3> Members of the Dao can fund these deals to incentivise the deals.

3> Storage Providers come and bid on the proposals by placing their bids.

4> Client gets notified as soon as a new bid is placed.

5> The Client has the option to discover miners by their Reputation. 
The Reputation of the miners grow as they do successful deals in the future (In process).

6> Clients can set up a 1 to 1 meet with the SP through huddle's tokengated meetings.

7> After both the parties agree they can activate the deal by calling the Activate deal function from the contract.

8> After the deal is completed the SP can withdraw the funds from the escrow contract which needs verification that the deal is completed.

## The Project Story of How It was built 

The Project was built from lots of hours of hardwork put in.

First, the mvp was structured of how things would go on the platform.
 
then the  contract for the project was written https://github.com/legendarykamal/FVM-Contract/blob/master/contracts/data-dao/DataDAOBounty.sol

which used zondax MarketApi to call FileCoinDeals which was the eccentric point of our project.

After this we started with making of the UI , we utilised the powers of NextJS for our frontend , combined it with wagmi for the wallet setup.

Hyperspace Testnet was set by me after getting no resources for it. Many bugs came our way but we held tightly motivated to build this amazing project with over 80+ commits.

Data Persistency problem was solved using Context Api , then we came upon adding features .

We used Push Notifications to notify our clients whenever any storage Provider bidded for their proposal.

Utilised Huddle01 to give tokengated authentic one to one discussions among the clients and SP before the final deal.

All the steps of storage of Deals on FVM were tried to be implemented in short span of time. But we loved the process.

The hacky thing was the bidding process in our project, context api and FVM were not easy to deal with but we implemented the bidding functionality on our platform :) 

Marketplace for storage on top of FVM

Push Protocol is used to notify the Users on the platform

Client - Get Notified as soon as a provider places a bid for your proposal .

SP - Get notified as soon as your bid gets accepted

Huddle01 is used to connect the sp with clients prior to finalising the deals
