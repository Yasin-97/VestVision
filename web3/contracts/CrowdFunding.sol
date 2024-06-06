// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./ProjectToken.sol";
import "./ITokenData.sol";

contract CrowdFunding {
    struct Project {
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
        ProjectToken token;
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

    struct RecenetInvestments {
        address sender;
        uint256 amount;
        string title;
    }

    mapping(uint256 => Project) public projects;
    mapping(uint256 => Like[]) public projectLikes;
    mapping(uint256 => mapping(uint256 => Comment)) public projectComments;

    uint256 public numberOfProjects = 0;
    uint256 public numberOfInvestments = 0;
    uint256 public numberOfInvestors = 0;

    RecenetInvestments[5] public recentInvestments;
    uint256 public nextInvestmentIndex = 0;

    function createProject(
        address _owner,
        string memory _title,
        string memory _category,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Project storage project = projects[numberOfProjects];
        require(
            project.deadline < block.timestamp,
            "The deadline should be a date in the future."
        );

        project.owner = _owner;
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
        Comment memory newComment = Comment({owner: msg.sender, text: _text});
        projectComments[_id][projects[_id].numberOfComments] = newComment;
        projects[_id].numberOfComments++;

        return newComment;
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

        recentInvestments[nextInvestmentIndex] = RecenetInvestments({
            sender: msg.sender,
            amount: amount,
            title: project.title
        });

        nextInvestmentIndex = (nextInvestmentIndex + 1) % 5;

        (bool sent, ) = payable(project.owner).call{value: amount}("");

        if (sent) {
            project.token.transfer(msg.sender, tokenAmount);
            project.amountCollected += amount;
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
        return (projects[_id].investors, projects[_id].investments);
    }

    function getNumberOfLikes(uint256 _id) public view returns (uint256) {
        require(_id < numberOfProjects, "Project does not exist.");
        return projectLikes[_id].length;
    }

    function getAllComments(
        uint256 _id
    ) public view returns (Comment[] memory) {
        Comment[] memory commentsList = new Comment[](
            projects[_id].numberOfComments
        );

        for (uint256 i = 0; i < projects[_id].numberOfComments; i++) {
            Comment storage comment = projectComments[_id][i];
            commentsList[i] = comment;
        }

        return (commentsList);
    }

    function getProjects() public view returns (Project[] memory) {
        Project[] memory allProjects = new Project[](numberOfProjects);

        for (uint i = 0; i < numberOfProjects; i++) {
            Project storage item = Projects[i];
            allProjects[i] = item;
        }

        return allProjects;
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
        returns (uint256, uint256, uint256, RecenetInvestments[5] memory)
    {
        return (
            numberOfInvestments,
            numberOfInvestors,
            numberOfProjects,
            recentInvestments
        );
    }
}
