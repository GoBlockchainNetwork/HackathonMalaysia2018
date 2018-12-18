pragma solidity ^0.4.25;

contract DrugSystem {
    struct Drug {
        string name;
        string manufacturer;
        string batchNo;
        string manufacturingDate;
        string expiryDate;
        string contents;
        string usage;
        string sideEffects;
        bool recalled;
        address drug;

        //address drug;
        address[] users;
    }

    mapping (address => Drug) drugs;
    address[] storedKeys;

    event recall(address value);
    
    
    constructor() public {
        address a1 = 0x1936c24Da826d691a8bB53b107Ad031E1f4Cb724;
        Drug d1;

        d1 = drugs[a1];
        d1.drug = address(a1);
        d1.name = "Clarinase Tablet 120mg";
        d1.manufacturer = "Cutik Medicare Pvt Ltd";
        d1.batchNo ="71RPG74A01";
        d1.manufacturingDate = "12-09-2016";
        d1.expiryDate = "12-09-2016";
        d1.contents = "Loratadine, Pseudoephedrine";
        d1.usage = "Cold, Sneezing, Runny nose, Itchy nose, Eye irritation, Red and itchy skin, Skin disorders, Allergies, High fever, Sinus congestion and pressure";
        d1.sideEffects = "Headache, Drowsiness, Unusual tiredness and weakness, Sleeplessness, Stomach pain, diarrhea, Hives and wheezing, Difficulty in breathing, Swelling of face, lips, eyelids, tongue, hands and feet, Impaired Liver function, Influenza, Upper respiratory tract infection";
        d1.recalled = false;

        storedKeys.push(a1);

        address a2 = 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;
        Drug d2;

        d2 = drugs[a2];
        d2.drug = address(a2);
        d2.name = "Stenac Tablet 600mg";
        d2.manufacturer = "Synmosa Biopharma Corporation";
        d2.batchNo ="B26881";
        d2.manufacturingDate = "23-08-2017";
        d2.expiryDate = "23-08-2020";
        d2.contents = "Acetylcysteine";
        d2.usage = "Mucus thinning, Paracetamol overdose, Prevention of radiocontrast-induced nephropathy";
        d2.sideEffects = "Rash, Urticaria, Pruritus, Hypotension, Wheezing, Shortness of breath, Nausea, Vomiting, Stomatitis, Fever, Rhinorrhea, Drowsiness, Clamminess, Chest tightness, Bronchoconstriction";
        d2.recalled = false;

        storedKeys.push(a2);

        address a3 = 0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C;
        Drug d3;

        d3 = drugs[a3];
        d3.drug = address(a3);
        d3.name = "Tussidex Forte Linctus";
        d3.manufacturer = "Xepa-Soul Pattinson (Malaysia) Sdn Bhd";
        d3.batchNo ="377872";
        d3.manufacturingDate = "31-07-2018";
        d3.expiryDate = "30-06-2021";
        d3.contents = "Dextromethorphan Hydrobromide 15mg";
        d3.usage = "Cough";
        d3.sideEffects = "Drowsiness, Dizziness, Nausea, Vomiting, Restlessness";
        d3.recalled = false;

        storedKeys.push(a3);
    }
    
    function recallDrug(address drug) public {
        drugs[drug].recalled = true;
        emit recall(drug);
    }

    function getUniqueId() public view returns (address) 
    {

        bytes20 b = bytes20(keccak256(msg.sender, now));
        uint addr = 0;
        for (uint index = b.length-1; index+1 > 0; index--) {
            addr += uint(b[index]) * ( 16 ** ((b.length - index - 1) * 2));
        }

        return address(addr);
    }
    
        
    function getDrugsCount() public view returns (uint) {
        return storedKeys.length;
    }

    function getNthDrugAddress(uint n) public view returns (address) {
        return storedKeys[n];
    }
    
    function getDrugName(address drug) public view returns (string) {
        return drugs[drug].name;
    }

    function getDrugDetail1(address drug) public view returns (string, string, string, string, string) {
        return (drugs[drug].name, drugs[drug].manufacturer, drugs[drug].batchNo, drugs[drug].manufacturingDate, drugs[drug].expiryDate) ;
    }

    function getDrugDetail2(address drug) public view returns (string, string, string, bool) {
        return (drugs[drug].contents, drugs[drug].usage, drugs[drug].sideEffects, drugs[drug].recalled) ;
    }

    function isRecalled(address drug) public view returns (bool) {
        return drugs[drug].recalled;
    }

    function resetAll() public {
        uint len = storedKeys.length;

        for (uint i = 0; i<len; i++) {
            drugs[storedKeys[i]].recalled = false;
        }
    }
}