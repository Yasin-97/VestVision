// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./ProjectToken.sol";
import "./ITokenData.sol";

contract CrowdFunding {
    struct Project {
        address owner;
        string ownerName;
        string category;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] investors;
        uint256[] investments;
        ProjectToken token;
        uint256 numberOfComments;
    }

    struct Like {
        address liker;
        uint256 timestamp;
    }

    struct Comment {
        uint256 projectId;
        address owner;
        string text;
    }

    struct RecentInvestments {
        address investor;
        uint256 amount;
        string title;
    }

    mapping(uint256 => Project) private projects;
    mapping(uint256 => Like[]) private projectLikes;
    mapping(uint256 => Comment[]) private projectComments;

    uint256 private numberOfProjects = 0;
    uint256 private numberOfInvestments = 0;
    uint256 private numberOfInvestors = 0;

    RecentInvestments[5] private recentInvestments;
    uint256 private nextInvestmentIndex = 0;

    function createProject(
        address _owner,
        string memory _ownerName,
        string memory _title,
        string memory _category,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Project storage project = projects[numberOfProjects];
        require(
            _deadline > block.timestamp,
            "The deadline should be a date in the future."
        );

        project.owner = _owner;
        project.ownerName = _ownerName;
        project.title = _title;
        project.category = _category;
        project.description = _description;
        project.target = _target;
        project.deadline = _deadline;
        project.amountCollected = 0;
        project.image = _image;

        numberOfProjects++;

        return numberOfProjects - 1;
    }

    function createTokenForProject(
        uint256 projectId,
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint256 projectOwnerShare,
        address teamAddress,
        uint256 teamShare,
        address advisorAddress,
        uint256 advisorShare,
        address reserveAddress,
        uint256 reserveShare
    ) public {
        require(projectId < numberOfProjects, "Project does not exist");

        ProjectToken token = new ProjectToken(
            name,
            symbol,
            initialSupply,
            projectOwnerShare,
            teamAddress,
            teamShare,
            advisorAddress,
            advisorShare,
            reserveAddress,
            reserveShare
        );

        projects[projectId].token = token;
    }

    function likeProject(uint256 _id) public {
        require(_id < numberOfProjects, "Project does not exist.");

        Like memory newLike = Like({
            liker: msg.sender,
            timestamp: block.timestamp
        });
        projectLikes[_id].push(newLike);
    }

    function addComment(
        uint256 _id,
        string memory _text
    ) public returns (Comment memory) {
        Comment memory newComment = Comment({
            projectId: _id,
            owner: msg.sender,
            text: _text
        });
        projectComments[_id].push(newComment);
    }

    function investInProject(uint256 _id) public payable {
        require(_id < numberOfProjects, "Project does not exist.");
        Project storage project = projects[_id];

        uint256 amount = msg.value;
        uint256 tokenAmount = calculateTokenAmount(amount);

        project.investors.push(msg.sender);
        project.investments.push(amount);

        numberOfInvestments += amount;
        numberOfInvestors++;

        recentInvestments[nextInvestmentIndex] = RecentInvestments({
            investor: msg.sender,
            amount: amount,
            title: project.title
        });

        nextInvestmentIndex = (nextInvestmentIndex + 1) % 5;

        payable(project.owner).transfer(amount);

        project.token.transfer(msg.sender, tokenAmount);
        project.amountCollected += amount;
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
        return (projects[_id].investors, projects[_id].investments);
    }

    function getNumberOfLikes(uint256 _id) public view returns (uint256) {
        require(_id < numberOfProjects, "Project does not exist.");
        return projectLikes[_id].length;
    }

    function getProjectComments(
        uint256 _id
    ) public view returns (Comment[] memory) {
        return projectComments[_id];
    }

    function getProjects() public view returns (Project[] memory) {
        Project[] memory allProjects = new Project[](numberOfProjects);

        for (uint i = 0; i < numberOfProjects; i++) {
            Project storage item = projects[i];
            allProjects[i] = item;
        }

        return allProjects;
    }

    function getSingleProject(
        uint256 _id
    ) public view returns (Project memory) {
        require(_id < numberOfProjects, "Project does not exist.");
        return projects[_id];
    }

    function getProjectTokenData(
        uint256 _id
    )
        public
        view
        returns (
            string memory name,
            string memory symbol,
            uint256 totalSupply,
            address projectOwner,
            uint256 projectOwnerShare,
            address teamAddress,
            uint256 teamShare,
            address advisorAddress,
            uint256 advisorShare,
            address earlyInvestorsAddress,
            uint256 earlyInvestorsShare
        )
    {
        require(_id < numberOfProjects, "Project does not exist");

        ITokenData tokenContract = ITokenData(address(projects[_id].token));
        return tokenContract.tokenData();
    }

    function getInvestmentSummary()
        public
        view
        returns (uint256, uint256, uint256, RecentInvestments[5] memory)
    {
        return (
            numberOfInvestments,
            numberOfInvestors,
            numberOfProjects,
            recentInvestments
        );
    }
}
