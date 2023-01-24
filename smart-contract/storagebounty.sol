pragma solidity ^0.8.0;

contract StorageBounty {
    struct Provider {
        address providerAddress;
        uint storageAmount;
        uint price;
    }

    struct Client {
        address clientAddress;
        uint storageNeeded;
        address selectedProvider;
    }

    mapping(address => Provider) providers;
    mapping(address => Client) clients;
    address owner;

    constructor() public {
        owner = msg.sender;
    }

    function submitBid(uint storageAmount, uint price) public {
        require(msg.sender != owner, "Bids can only be submitted by providers.");
        providers[msg.sender] = Provider(msg.sender, storageAmount, price);
    }

    function selectProvider(address selectedProvider) public {
        require(msg.sender != owner, "Providers can only be selected by clients.");
        require(providers[selectedProvider].storageAmount >= clients[msg.sender].storageNeeded, "Selected provider does not have enough storage.");
        clients[msg.sender].selectedProvider = selectedProvider;
    }

    function allocateStorage() public {
        require(msg.sender == owner, "Only the contract owner can allocate storage.");
        Provider storageProvider = providers[clients[msg.sender].selectedProvider];
        storageProvider.storageAmount -= clients[msg.sender].storageNeeded;
        // Send payment to provider
        storageProvider.providerAddress.transfer(storageProvider.price);
    }
}
