pragma solidity *0.4.25;

contract medical{
   string public status;
   string public role;
   string public name;
   string public ic;
   string public location;

   constructor (string initialStatus, string initialRole, string initialName, string initialIC, string initialLocation) public{
       status = initialStatus;
       role = initialRole;
       name = initialName;
       ic = initialIC;
       location = initialLocation;

   }

   function setStatus(string newStatus) public {
       status = newStatus;
   }

   function setRole(string newRole) public {
       role = newRole;
   }

   function setName(string newName) public {
       name = newName;
   }

   function setIC(string newIC) public {
       ic = newIC;
   }

   function setLocation(string newLocation) public {
       location = newLocation;
   }



}