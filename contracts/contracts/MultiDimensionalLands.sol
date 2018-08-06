pragma solidity ^0.4.17;
import './ILANDRegistry.sol';

contract MultiDimensionalLands { //A simple contract for implmenting the basics for multidimensional parcels more complex stuff can be built on top of this
    //variables
    mapping(uint256 => mapping(bytes32 => string)) LandParcels; //mapping of land id to a mapping of hashes to IPFS addresses
    ILANDRegistry landRegistry = ILANDRegistry(0x0);

    //internal functions
    function isLandOwner(uint256 landParcel, address sender) internal view returns (bool) {
        int x;
        int y;
        (x, y) = landRegistry.decodeTokenId(landParcel);
        return landRegistry.ownerOfLand(x, y) == sender;
    }

    //public utilities
    function dimensionExists(uint256 landParcel, bytes32 dimensionId) public view returns (bool) {
        return keccak256(LandParcels[landParcel][dimensionId]) != keccak256(""); //check if room contents is not a empty string
    }

    //public state modifying functions
    function updateDimension(uint256 landParcel, bytes32 dimensionId, string content) public { //used to create and modify rooms
        require(isLandOwner(landParcel, msg.sender));
        LandParcels[landParcel][dimensionId] = content;
    }

    function removeDimension(uint256 landParcel, bytes32 dimensionId) public {
        require(isLandOwner(landParcel, msg.sender));
        require(dimensionExists(landParcel,dimensionId)); //no point spending gas to delete the room if it does not exist
        LandParcels[landParcel][dimensionId] = "";
    }
}
