import { MarketAPI } from "./libs/MarketAPI.sol";
import { CommonTypes } from "./libs/types/CommonTypes.sol";
import { MarketTypes } from "./libs/types/MarketTypes.sol";

contract Test{


    function kamalGetdeallabel(uint64 dealId) Public returns(string memory){
        return MarketAPI.getDealLabel(dealId).label;
    }
}