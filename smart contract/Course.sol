// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";
contract Course is ERC721 {
   address dex = 0xFCe007Aa5b65ea377Ab232D058A7A9794f7DEeC4;
   using Counters for Counters.Counter;
   Counters.Counter private _courseIds;
   mapping (uint256 => address) coursetoowner;
   mapping (uint256 => mapping(address => bool)) hasEnroll;
   constructor() ERC721("Skilline", "skl") {}
   struct Ourcourse {
        uint256 courseIds;
        address payable owner;
        address payable author;
        uint256 price;
    }
    mapping (uint256 => Ourcourse) idtoCourse;
    event CoursecreateSuccess (
        uint256 indexed tokenId,
        address owner,
        address author,
        uint256 price
    );
    mapping(address => mapping(uint256 => bool)) public executedReward;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner,uint256 courseId);

    modifier onlyOwner(uint256 courseId) {
        _checkOwner(courseId);
        _;
    }
    function _verifySignature(
        uint256 _tokenId,
        uint256 _amount,
        uint256 _nonce,
        bytes memory _signature
    ) internal view {
        require(!executedReward[msg.sender][_nonce], "Reward executed");
        bytes32 ethSignedMessageHash = ECDSAUpgradeable.toEthSignedMessageHash(
            keccak256(
                abi.encodePacked(
                    _tokenId,
                    _amount,
                    msg.sender,
                    dex,
                    address(this),
                    _nonce
                )
            )
        );

        require(
            dex ==
                ECDSAUpgradeable.recover(ethSignedMessageHash, _signature),
            "invalid signature"
        );
    }
    function _checkOwner(uint256 courseId) internal view virtual {
        require(idtoCourse[courseId].owner == _msgSender(), "Ownable: caller is not the owner course");
    }

    function transferOwnership(address payable  newOwner, uint256 courseId) public virtual onlyOwner(courseId) {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner,courseId);
    }
    
    function _transferOwnership(address payable newOwner, uint256 courseId) internal virtual {
        address oldOwner = idtoCourse[courseId].owner;
        idtoCourse[courseId].owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner, courseId);
    }

    function getLatestIdToCourse() public view returns (Ourcourse memory) {
        uint256 currentId = _courseIds.current();
        return idtoCourse[currentId];
    }

    function getCourseForId(uint256 tokenId) public view returns (Ourcourse memory) {
        return idtoCourse[tokenId];
    }
    function getCurrentId() public view returns (uint256) {
        return _courseIds.current();
    }

   // event Enroll(address student,address owner,address author,uint256 price);
   function createId(uint256 price, uint256 _nonce,
        bytes calldata _signature)
        public
        returns (uint256)
    {  
        _verifySignature(getCurrentId(),price,_nonce, _signature); 
        _courseIds.increment();

        uint256 newItemId = _courseIds.current();
        
        _safeMint(msg.sender, newItemId);
        createCourse(newItemId, price);
        return newItemId;
  }  


  function createCourse(uint256 tokenId, uint256 price) private {
        //Just sanity check
        require(price > 0, "Make sure the price isn't negative");

        //Update the mapping of tokenId's to Token details, useful for retrieval functions
        idtoCourse[tokenId] = Ourcourse(
            tokenId,
            payable(msg.sender),
            payable(msg.sender),
            price
        );
        //Emit the event for successful transfer. The frontend parses this message and updates the end user
        emit CoursecreateSuccess(
            tokenId,
            address(this),
            msg.sender,
            price
        );
    }
    

   // function tranferOwner(address payable newOwner) external
}