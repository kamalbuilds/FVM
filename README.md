# Marketplace for storage on top of  FVM

## Features

1> Building a platform where Clients would list Storage bounties and where storage providers compete to win deals, bringing the price down for clients.

🛠 Discovery tools: Best use of FVM to improve transparency around Filecoin economy participants (e.g., storage providers, storage clients etc.).

2> Push Protocol is used to notify the Users on the platform 

Client - Get Notified as soon as a provider places a bid for your proposal .

SP - Get notified as soon as your bid gets accepted.

3> Huddle01 Tokengated secured meetups to understand better befor the final deal between client and the Providers.

4> The Smart Contract code could be found here - https://github.com/legendarykamal/FVM-Contract 

For an indepth video explaination of the platform refer - https://youtu.be/VsRXHH8vJl0

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
