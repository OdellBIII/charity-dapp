// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DownBad {

	mapping(address => uint) public balances;
	mapping (address => bool) public downBadAddresses;

	function () external payable {

		balances[msg.sender] += msg.value;
	}

	function getBalance(address _addr) public view returns (uint) {

		return balances[_addr];
	}

	function joinDownBad(address _downBad) public {

		if(balances[msg.sender] > 0){

			downBadAddresses[_downBad] = true;
		}
	}

	function isDownBad(address _addr) public view returns (bool) {

		return downBadAddresses[_addr];
	}


	function withdraw() public {
		if(downBadAddresses[msg.sender]){

		}
	}

}
