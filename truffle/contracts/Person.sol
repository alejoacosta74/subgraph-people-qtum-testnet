pragma solidity >=0.5.0;

contract PersonRegistry {
  event NewPerson(uint id, address owner, string displayName, string imageUrl);
  event UpdatedPerson(uint id, address owner, string displayName, string imageUrl);

  struct Person {
    address owner;
    string displayName;
    string imageUrl;
  }

  Person[] public people;

  mapping (uint => address) public personToOwner;
  mapping (address => uint) public ownerToPerson;

  function createPerson(string memory _displayName, string memory _imageUrl) public {
    require(ownerToPerson[msg.sender] == 0);
    uint id = people.push(Person(msg.sender, _displayName, _imageUrl)) - 1;

    personToOwner[id] = msg.sender;
    ownerToPerson[msg.sender] = id;

    emit NewPerson(id, msg.sender, _displayName, _imageUrl);
  }

  function getPerson(address owner) public view returns (string memory, string memory) {
    uint id = ownerToPerson[owner];
    return (people[id].displayName, people[id].imageUrl);
  }

  function updatePersonName(string memory _displayName) public {
    require(ownerToPerson[msg.sender] != 0);
    require(msg.sender == people[ownerToPerson[msg.sender]].owner);

    uint id = ownerToPerson[msg.sender];

    people[id].displayName = _displayName;
    emit UpdatedPerson(id, msg.sender, _displayName, people[id].imageUrl);
  }

  function updatePersonImage(string memory _imageUrl) public {
    require(ownerToPerson[msg.sender] != 0);
    require(msg.sender == people[ownerToPerson[msg.sender]].owner);

    uint id = ownerToPerson[msg.sender];

    people[id].imageUrl =  _imageUrl;
    emit UpdatedPerson(id, msg.sender, people[id].displayName, _imageUrl);
  }
}
