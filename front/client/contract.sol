// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Vote {
    address electionCommission;
    address public winner;

    enum Gender { Male, Female, Other }

    struct Voter {
        string name;
        uint age;
        uint voterId;
        Gender gender;
        uint voteCandidateId;
        address voterAddress;
    }

    struct Candidate {
        string name;
        string party;
        uint age;
        Gender gender;
        uint candidateId;
        address candidateAddress;
        uint votes;
    }

    enum VotingStatus { NotStarted, InProgress, Ended }

    uint nextVoterId = 1;
    uint nextCandidateId = 1;
    uint startTime;
    uint endTime;

    mapping(uint => Voter) voterDetails;
    mapping(uint => Candidate) candidateDetails;
    bool stopVoting;

    IERC20 public gldToken;

    event NewCandidateRegistered(string name, string party, uint age, Gender gender, uint candidateId);
    event NewVoterRegistered(string name, uint age, Gender gender, uint voterId);
    event VoteCasted(uint voterId, uint candidateId);
    event VotingPeriodSet(uint startTime, uint endTime);
    event VotingStatusUpdated(VotingStatus status);
    event ElectionResultAnnounced(address winner);

    constructor(address _gldToken) {
        gldToken = IERC20(_gldToken);
        electionCommission = msg.sender;
    }

    modifier isVotingOver() {
        require(block.timestamp > endTime || stopVoting == true, "Voting is not over");
        _;
    }

    modifier onlyCommissioner() {
        require(electionCommission == msg.sender, "Not from election commission");
        _;
    }

    function candidateVerification(address _person) internal view returns (bool) {
        for (uint i = 1; i < nextCandidateId; i++) {
            if (candidateDetails[i].candidateAddress == _person) {
                return false; // Loop entered - candidate exists
            }
        }
        return true; // Candidate does not exist
    }
   
    function getVoterProfile(uint _voterId) public view returns(Voter memory){
        require(voterDetails[_voterId].voterAddress==msg.sender);
        return voterDetails[_voterId];
    }
     function voterRegister(string calldata _name, uint _age, Gender _gender) external {
        require(voterVerification(msg.sender), "Voter Already Registered");
        require(_age >= 18, "You are not eligible");
 
        voterDetails[nextVoterId] = Voter(_name, _age, nextVoterId, _gender, 0, msg.sender);
        emit NewVoterRegistered(_name, _age, _gender, nextVoterId);
        nextVoterId++;
    }
        function candidateRegister(
        string calldata _name,
        string calldata _party,
        uint _age,
        Gender _gender
    ) external {
        require(_age >= 18, "Age is under 18");
        require(candidateVerification(msg.sender), "You have already registered");
        require(nextCandidateId < 3, "Candidate registration full");
        
        candidateDetails[nextCandidateId] = Candidate({
            name: _name,
            party: _party,
            age: _age,
            gender: _gender,
            candidateId: nextCandidateId,
            candidateAddress: msg.sender,
            votes: 0
        });
        
        nextCandidateId++;
    }


    function voterList() public view onlyCommissioner returns (Voter[] memory) {
        Voter[] memory voterArr = new Voter[](nextVoterId - 1);
        for (uint256 i = 1; i < nextVoterId; i++) {
            voterArr[i - 1] = voterDetails[i];
        }
        return voterArr;
    }

    function voterVerification(address _person) internal view returns (bool) {
        for (uint i = 1; i < nextVoterId; i++) {
            if (voterDetails[i].voterAddress == _person) {
                return false; // Voter already registered
            }
        }
        return true; // Voter not registered
    }
    
    function candidateList() public view returns (Candidate[] memory) {
        Candidate[] memory candidateArr = new Candidate[](nextCandidateId - 1);

        for (uint i = 1; i < nextCandidateId; i++) {
            candidateArr[i - 1] = candidateDetails[i]; // transferring data from mapping to array
        }

        return candidateArr;
   }

   

    function vote(uint _voterId, uint _id) external isVotingOver {
        require(gldToken.balanceOf(msg.sender) > 0, "Not enough tokens");
        require(voterDetails[_voterId].voteCandidateId == 0, "Already voted");
        require(voterDetails[_voterId].voterAddress == msg.sender, "You are not a voter");
        require(startTime != 0, "Voting not started");
        require(nextCandidateId == 3, "Candidate registration not done yet");
        require(_id > 0 && _id < 3, "Invalid Candidate Id");

        voterDetails[_voterId].voteCandidateId = _id;
        candidateDetails[_id].votes++;

        emit VoteCasted(_voterId, _id);
    }

    function voteTime(uint _startTime, uint _endTime) external onlyCommissioner() {
        startTime = block.timestamp + _startTime;
        endTime = startTime + _endTime;

        emit VotingPeriodSet(startTime, endTime);
    }

    function votingStatus() public view returns (VotingStatus) {
        if (startTime == 0) {
            return VotingStatus.NotStarted;
        } else if ((startTime != 0 && endTime > block.timestamp) && !stopVoting) {
            return VotingStatus.InProgress;
        } else {
            return VotingStatus.Ended;
        }
    }

    function result() external onlyCommissioner() {
        require(nextCandidateId > 1, "No candidates registered");

        uint maximumVotes = 0;
        address currentWinner;

        for (uint i = 1; i < nextCandidateId; i++) {
            if (candidateDetails[i].votes > maximumVotes) {
                maximumVotes = candidateDetails[i].votes;
                currentWinner = candidateDetails[i].candidateAddress;
            }
        }

        winner = currentWinner;

        emit ElectionResultAnnounced(winner);
    }

    function emergency() public onlyCommissioner() {
        stopVoting = true;
    }
}
