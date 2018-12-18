pragma solidity ^0.4.22;

contract ALSET {

    // GX: Used by both job poster and dispatcher
    struct Customer {
        address customer_address;
        uint coins;

        uint coinsInsuranceContributed;
        uint coinsInsuranceClaimed;
    }

    /**************************************************************************
     * Coins
     **************************************************************************/

    // The maximum number of ALSETcoins available for sale
    uint public max_ALSETcoins = 1000000;

    // uint public ttl_insured_coins = 500000;
    uint public insurance_pool_coins = 500000;
    uint public max_claim_coins = 200;
    // ttl_insured amt is 10 percent of coins reward of each job
    //only 50% of total insured coins can be claimed at a time.

    // RM to ALSETcoins conversion rate
    uint public coins_to_wei_rate = 1000;

    // The total number of ALSETcoins that have been sold or in circulation
    uint public total_ALSETcoins_bought = 0;

    // Getting equity in ALSETcoins
    function equity_in_ALSETcoins() public view returns(uint) {
        return customers[msg.sender].coins;
    }

    function buyCoins(uint coins) public payable returns(uint) {
        require(coins <= max_ALSETcoins - total_ALSETcoins_bought, "Not enough coins available.");

        uint cost = coins * coins_to_wei_rate;

        require(msg.value >= cost, "Not enough wei.");

        customers[msg.sender].coins += coins;
        total_ALSETcoins_bought += coins;

        return coins;
    }

    function sellCoins(uint coins) public returns(uint) {
        require(customers[msg.sender].coins >= coins, "Not enough coins available.");

        customers[msg.sender].coins -= coins;
        total_ALSETcoins_bought -= coins;

        msg.sender.transfer(coins * coins_to_wei_rate);

        return coins;
    }


    /**************************************************************************
     * Jobs
     **************************************************************************/

    enum State {
        Created,
        Picked,
        Delivered,
        Completed,
        Cancelled
    }

    struct Job {
        uint id;
        string name;

        address poster;
        address dispatcher;

        uint coinsReward;
        uint coinsCollateral; // GX: Important jobs require more collateral

        // Pickup and dropoff points
        uint pickuplong;
        uint pickuplat;
        uint dropofflong;
        uint dropofflat;

        uint timeAdded;
        uint timeDelivered;

        State state;
    }

    mapping(address => Customer) public customers;
    mapping(uint => Job) public jobs;
    // mapping(address => dispatcher) dispatchers;

    // Store job count
    uint public jobsCount = 0;

    modifier onlyJobOfType(uint jobId, State state) {
        require(jobs[jobId].state == state, "Incorrect job type.");
        _;
    }

    modifier onlyIfAfford(uint coins) {
        require(customers[msg.sender].coins >= coins, "Don't have enough coins.");
        _;
    }

    modifier onlyByJobOwner(uint jobId) {
        require(jobs[jobId].poster == msg.sender, "Not job owner.");
        _;
    }

    modifier onlyByJobDispatcher(uint jobId) {
        require(jobs[jobId].dispatcher == msg.sender, "Not job dispatcher.");
        _;
    }

    modifier onlyIfDispatchedAtLeastOnce(address sender) {
        uint dispatchCount = 0;

        for (uint i = 0; i < jobsCount; i++) {
            if (jobs[i].dispatcher == sender) {
                dispatchCount++;
            }
        }
        
        require(dispatchCount > 0, "Not entitled for claim.");
        _;
    }

    // Create a job
    function addJob(string jobName, uint coinsReward, uint coinsCollateral, uint pickuplong, uint pickuplat, uint dropofflong, uint dropofflat) public onlyIfAfford(coinsReward) {
        jobs[jobsCount] = Job(
            jobsCount,
            jobName,
            msg.sender,
            0,
            coinsReward,
            coinsCollateral,
            pickuplong,
            pickuplat,
            dropofflong,
            dropofflat,
            now,
            0,
            State.Created
        );
        jobsCount++;
        customers[msg.sender].coins -= coinsReward;
    }

    // Cancels a job. Only created jobs can be cancelled. And jobs can only cancelled by their owner.
    function cancelJob(uint jobId) public onlyJobOfType(jobId, State.Created) onlyByJobOwner(jobId) {
        jobs[jobId].state = State.Cancelled;

        // Return the reward deposited when adding job
        customers[jobs[jobId].poster].coins += jobs[jobId].coinsReward;
    }

    // function viewJobs(uint _mincoins) public view returns(uint, uint[], uint[]) {
    //     uint viewJobcount = 0;

    //     uint[] arrData1;
    //     uint[] arrData2;

    //     for (uint i = 0; i < jobsCount; i++) {
    //         if (jobs[i].state == State.Created && jobs[i].coinsReward >= _mincoins) {
    //             viewJobcount++;

    //             arrData1.push(jobs[i].id);
    //             arrData2.push(jobs[i].coinsReward);
    //         }
    //     }

    //     return (viewJobcount, arrData1, arrData2);
    // }

    // Picking up a job. You can only pick a job if it is created and you afford the collateral.
    function pickJob(uint jobId) public onlyJobOfType(jobId, State.Created) onlyIfAfford(jobs[jobId].coinsCollateral) {
        // Make sure job picker has enough to deposit the required collateral
        // require(customers[msg.sender].coins >= jobs[jobId].coinsCollateral);

        for (uint i = 0; i < jobsCount; i++) {
            // if (jobs[i].state == State.Created && jobs[i].id == jobId) {
            if (jobs[i].id == jobId) {
                // customers[msg.sender].coins -= 5;
                customers[msg.sender].coins -= jobs[jobId].coinsCollateral;

                jobs[i].state = State.Picked;
                jobs[i].dispatcher = msg.sender;

                // dispatchers[msg.sender].id.push(i);
                // dispatchers[msg.sender].state.push(State.Picked);

                break;
            }
        }
    }

    // Declare job delivered. For use by dispatcher.
    function deliveredJob(uint jobId) public onlyByJobDispatcher(jobId) {
        jobs[jobId].timeDelivered = now;
        jobs[jobId].state = State.Delivered;
    }

    // Acknowledge the delivery of a job. For use by job poster.
    function acknowledgeDelivery(uint jobId) public onlyByJobOwner(jobId) {
        require(
            jobs[jobId].state == State.Picked || jobs[jobId].state == State.Delivered,
            "Invalid job state."
        );

        // Return the collateral...
        customers[jobs[jobId].dispatcher].coins += jobs[jobId].coinsCollateral;
        // ...plus the reward
        customers[jobs[jobId].dispatcher].coins += jobs[jobId].coinsReward;

        // Mark job as completed
        jobs[jobId].state = State.Completed;

        // Collect some amount from reward...
        customers[jobs[jobId].dispatcher].coins -= jobs[jobId].coinsReward / 10;
        // ...and add to the insurance pool
        insurance_pool_coins += jobs[jobId].coinsReward / 10;
    }

    // Automatically clear payment after 3 days without acknowledgement.
    function autoClearPaymentForDeliveredJob() private {
        uint timeNow = now;

        for (uint i = 0; i < jobsCount; i++) {
            if (jobs[i].state == State.Delivered &&
                jobs[i].timeDelivered - timeNow >= 3 days) {
                // Return the collateral...
                customers[jobs[i].dispatcher].coins += jobs[i].coinsCollateral;
                // ...plus the reward
                customers[jobs[i].dispatcher].coins += jobs[i].coinsReward;

                // Mark job as completed
                jobs[i].state == State.Completed;
            }
        }
    }

    // Get count, total rewards, and total collateral for transactions of a certain type.
    function getTransactionsCountRewardsAndCollaterals(State state) public view returns(uint, uint, uint) {
        uint count = 0;
        uint coinsReward = 0;
        uint coinsCollateral = 0;

        for (uint i = 0; i < jobsCount; i++) {
            if (jobs[i].state == state) {
                count++;
                coinsReward += jobs[i].coinsReward;
                coinsCollateral += jobs[i].coinsCollateral;
            }
        }

        return (count, coinsReward, coinsCollateral);
    }

    // Get the amount of times and total rewards earned by a particular user.
    function getDispatcherRoleCountAndRewards(address sender) public view returns(uint, uint) {
        uint count = 0;
        uint coinsReward = 0;

        for (uint i = 0; i < jobsCount; i++) {
            if (jobs[i].dispatcher == sender) {
                count++;
                coinsReward += jobs[i].coinsReward;
            }
        }

        return (count, coinsReward);
    }

    // Get the amount of times and total rewards given by a particular user.
    function getJobPosterRoleCountAndRewards(address sender) public view returns(uint, uint) {
        uint count = 0;
        uint coinsReward = 0;

        for (uint i = 0; i < jobsCount; i++) {
            if (jobs[i].poster == sender) {
                count++;
                coinsReward += jobs[i].coinsReward;
            }
        }

        return (count, coinsReward);
    }

    // Check whether the claim person is our dispatcher, if yes allow to disbursed the amount
    function submitClaim(uint claimTokens) public onlyIfDispatchedAtLeastOnce(msg.sender) returns(uint) {
        require(claimTokens <= insurance_pool_coins, "Not enough coins in the insurance pool.");
        require(claimTokens <= max_claim_coins, "Maximum claim tokens exceeded.");
        
        for (uint i = 0; i < jobsCount; i++) {
            if (jobs[i].dispatcher == msg.sender) {
                // Deduct from the pool...
                insurance_pool_coins -= claimTokens;
                // ...and add to customer
                customers[msg.sender].coins += claimTokens;

                return claimTokens;
            }
        }

        return 0;
    }
}