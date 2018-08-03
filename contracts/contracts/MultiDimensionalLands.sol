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
    function roomExists(uint256 landParcel, bytes32 roomId) public view returns (bool) {
        return keccak256(LandParcels[landParcel][roomId]) != keccak256(""); //check if room contents is not a empty string
    }

    //public state modifying functions
    function updateRoom(uint256 landParcel, bytes32 roomId, string content) public { //used to create and modify rooms
        require(isLandOwner(landParcel, msg.sender));
        LandParcels[landParcel][roomId] = content;
    }

    function removeRoom(uint256 landParcel, bytes32 roomId) public {
        require(isLandOwner(landParcel, msg.sender));
        require(roomExists(landParcel, roomId)); //no point spending gas to delete the room if it does not exist
        LandParcels[landParcel][roomId] = "";
    }
}