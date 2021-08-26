// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DownBad {

	event JoinDownBad(address payable _downBadAddr);
	event LeftDownBad(address payable _downBadAddr);
	event Donation(address _donatorAddr);

	struct DownBadManager {
		address payable[] downBadAddressesArr;
		mapping (address => bool)  downBadAddressesPresent;
		mapping (address => uint)  downBadIndices;
	}

	DownBadManager manager;

	function () external payable {

		if(manager.downBadAddressesArr.length != 0){
			uint numOfDownBad = manager.downBadAddressesArr.length;
			uint split = msg.value / numOfDownBad;

			for(uint i = 0; i < numOfDownBad; i++){

				manager.downBadAddressesArr[i].transfer(split);
			}

			emit Donation(msg.sender);
		}

	}

	function isDownBad(address _addr) public view returns (bool) {

		return manager.downBadAddressesPresent[_addr];
	}

	function joinDownBad(address payable _downBad) public {

		if(!isDownBad(_downBad)){

			manager.downBadAddressesArr.push(_downBad);
			manager.downBadAddressesPresent[_downBad] = true;
			uint arrLength = manager.downBadAddressesArr.length;
			manager.downBadIndices[_downBad] = arrLength - 1;
			emit JoinDownBad(_downBad);
		}
	}



	function removeDownBad(address payable _downBad) public {

		if(isDownBad(_downBad)){

			uint index = manager.downBadIndices[_downBad];
			uint arrLength = manager.downBadAddressesArr.length;
			manager.downBadAddressesArr[index] = manager.downBadAddressesArr[arrLength - 1];
			delete manager.downBadAddressesArr[arrLength - 1];
			manager.downBadAddressesPresent[_downBad] = false;
			emit LeftDownBad(_downBad);
		}

	}

}
