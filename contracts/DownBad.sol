// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DownBad {
	
	mapping(address => uint) downBadIndices;
	uint[] balances = new uint[](1);
	
	function () external payable {

		uint split = msg.value / balances.length;	
		for(uint i = 0; i < balances.length; i++){
			
			balances[i] += split;
		}
	}

	function joinDownBad() public {
		
		if(downBadIndices[msg.sender] == 0){

			downBadIndices[msg.sender] = balances.length;
			balances.push(0);
		}
	}
	

	function withdraw() public {

		if(downBadIndices[msg.sender] != 0){
			
			uint index = downBadIndices[msg.sender];
			address payable addr = address(uint160(msg.sender));
			addr.transfer(balances[index]);
		}
	}

}
