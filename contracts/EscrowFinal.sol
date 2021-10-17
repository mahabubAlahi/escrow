pragma solidity >=0.7.0 <0.9.0;

//pragma abicoder v2;

contract EscrowFinal {
    
    //Address of Arbitror
    address arbitor;
    address[] depositorList;
    
    enum State { PENDING, WITHDRAW, COMPLETE }
    
     struct EscrowService{
        address depositor;
        address payable recipient;
        uint serviceValue;
        uint minimumWithDrawlTime;
        bool serviceState;
        State escrowState;
    }
    
    //EscrowService[] escrowRequests;
    
    mapping(address => EscrowService[]) escrowServices;
    mapping(address => bool) ongoingService;
    
    constructor() {
        arbitor = msg.sender;
    }
    
    function deposit(address payable _recipient) external payable {
        require(ongoingService[msg.sender] == false, "You Already have a deposit ongoing!");
        
         EscrowService memory newEscrowService = EscrowService({
           depositor: msg.sender,
           recipient: _recipient,
           serviceValue: msg.value,
           minimumWithDrawlTime: block.timestamp + 1 days,
           serviceState: false,
           escrowState: State.PENDING
        });
        
        if(escrowServices[msg.sender].length == 0){
            depositorList.push(msg.sender);
        }
        
        escrowServices[msg.sender].push(newEscrowService);
        ongoingService[msg.sender] = true;

    }
    
    function withdraw() external {
        require(ongoingService[msg.sender] == true, "You have no deposit available to withdraw");
        require(block.timestamp > escrowServices[msg.sender][escrowServices[msg.sender].length -1].minimumWithDrawlTime, "You can not withdraw earlier than 24 hours after deposit!");
        require(escrowServices[msg.sender][escrowServices[msg.sender].length -1].escrowState == State.PENDING, "Your service is already completed or withdrawn");
        
        address payable _depositor = payable(msg.sender);
        
        _depositor.transfer(escrowServices[msg.sender][escrowServices[msg.sender].length -1].serviceValue);
        escrowServices[msg.sender][escrowServices[msg.sender].length -1].escrowState = State.WITHDRAW;
        ongoingService[msg.sender] = false;
        
    }
    
    function serviceComplete() external {
        require(ongoingService[msg.sender] == true, "You have no deposit available to complete");
        require(escrowServices[msg.sender][escrowServices[msg.sender].length -1].serviceState == false, "Your already get your service");
        require(escrowServices[msg.sender][escrowServices[msg.sender].length -1].escrowState == State.PENDING, "Your service is already completed or withdrawn");
        
        
        escrowServices[msg.sender][escrowServices[msg.sender].length -1].serviceState = true;
    }
    
    function unlockDeposit(address _depositor) external {
        require(msg.sender == arbitor, "Only Arbitor can unlock any deposit");
        require(ongoingService[_depositor] == true, "There is no deposit available to this _depositor");
        require(escrowServices[_depositor][escrowServices[_depositor].length -1].serviceState == true, "Service is not delivered yet");
        require(escrowServices[_depositor][escrowServices[_depositor].length -1].escrowState == State.PENDING, "This Depositor's service is already completed or withdrawn");
        
        escrowServices[_depositor][escrowServices[_depositor].length -1].recipient.transfer(escrowServices[_depositor][escrowServices[_depositor].length -1].serviceValue);
        ongoingService[_depositor] = false;
        escrowServices[_depositor][escrowServices[_depositor].length -1].escrowState = State.COMPLETE;
        
    }
    
    function getArbitorAddress() external view returns(address){
        return arbitor;
    }
    
    function getAllDepositors() external view returns(address[] memory) {
        return depositorList;
    }
    
    function getallDeposits(address _depositor) external view returns(EscrowService[] memory){
        return escrowServices[_depositor];
    }
}