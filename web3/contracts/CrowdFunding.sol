// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./CampaignToken.sol";
import "./ITokenData.sol";

contract CrowdFunding {
    struct Campaign {
        address owner;
        string category;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] investors;
        uint256[] investments;
        CampaignToken token;
        uint256 numberOfComments;
    }

    struct Like {
        address liker;
        uint256 timestamp;
    }

    struct Comment {
        address owner;
        string text;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => Like[]) public campaignLikes;
    mapping(uint256 => mapping(uint256 => Comment)) public campaignComments;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _category,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];
        require(
            campaign.deadline < block.timestamp,
            "The deadline should be a date in the future."
        );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.category = _category;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function createTokenForCampaign(
        uint256 campaignId,
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint256 campaignOwnerShare,
        address teamAddress,
        uint256 teamShare,
        address advisorAddress,
        uint256 advisorShare,
        address reserveAddress,
        uint256 reserveShare
    ) public {
        require(campaignId < numberOfCampaigns, "Campaign does not exist");

        CampaignToken token = new CampaignToken(
            name,
            symbol,
            initialSupply,
            campaignOwnerShare,
            teamAddress,
            teamShare,
            advisorAddress,
            advisorShare,
            reserveAddress,
            reserveShare
        );

        campaigns[campaignId].token = token;
    }

    function likeCampaign(uint256 _id) public {
        require(_id < numberOfCampaigns, "Campaign does not exist.");

        Like memory newLike = Like({
            liker: msg.sender,
            timestamp: block.timestamp
        });
        campaignLikes[_id].push(newLike);
    }

    function getNumberOfLikes(uint256 _id) public view returns (uint256) {
        require(_id < numberOfCampaigns, "Campaign does not exist.");
        return campaignLikes[_id].length;
    }

    function addComment(
        uint256 _id,
        string memory _text
    ) public returns (Comment memory) {
        Comment memory newComment = Comment({owner: msg.sender, text: _text});
        campaignComments[_id][campaigns[_id].numberOfComments] = newComment;
        campaigns[_id].numberOfComments++;

        return newComment;
    }

    function investInCampaign(uint256 _id) public payable {
        require(_id < numberOfCampaigns, "Campaign does not exist.");
        Campaign storage campaign = campaigns[_id];

        uint256 amount = msg.value;
        uint256 tokenAmount = calculateTokenAmount(amount);

        campaign.investors.push(msg.sender);
        campaign.investments.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.token.transfer(msg.sender, tokenAmount);
            campaign.amountCollected += amount;
        }
    }

    function calculateTokenAmount(
        uint256 investment
    ) internal pure returns (uint256) {
        uint256 rate = 1000;
        return (investment * rate) / (1 ether);
    }

    function getInvestors(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].investors, campaigns[_id].investments);
    }

    function getAllComments(
        uint256 _id
    ) public view returns (Comment[] memory) {
        Comment[] memory commentsList = new Comment[](
            campaigns[_id].numberOfComments
        );

        for (uint256 i = 0; i < campaigns[_id].numberOfComments; i++) {
            Comment storage comment = campaignComments[_id][i];
            commentsList[i] = comment;
        }

        return (commentsList);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    function getCampaignTokenData(
        uint256 _id
    )
        public
        view
        returns (
            string memory name,
            string memory symbol,
            uint256 totalSupply,
            address campaignOwner,
            uint256 campaignOwnerShare,
            address teamAddress,
            uint256 teamShare,
            address advisorAddress,
            uint256 advisorShare,
            address earlyInvestorsAddress,
            uint256 earlyInvestorsShare
        )
    {
        require(_id < numberOfCampaigns, "Campaign does not exist");

        ITokenData tokenContract = ITokenData(address(campaigns[_id].token));
        return tokenContract.tokenData();
    }
}
