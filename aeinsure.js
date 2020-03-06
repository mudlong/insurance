const contractSource =`
contract Insureance = 
	
    record insure =
        { conAddress  : address,
          fName       : string,
          lName       : string,
          // sex 		  : string, 
          id1         : string, 
          idd         : int,
          phone 		: int,
				email 		: string,
				address 	: string,
				city 		: string,
				state 		: string,
				// Emergency contact info entry
				fName2 		: string,
				lName2		: string,
				email2 		: string,
				relation	: string,
				phone2 		: int}   
    record state = 
        { insurer       : map(string, insure),
          insuredLength : int }
          
    entrypoint init() = 
        { insurer       = {},
          insuredLength = 0 }
    
    
    entrypoint getinsuredLength() : int =
        state.insuredLength
    
    entrypoint alreadyInsured(ident : string) : bool = 
        Map.member(ident , state.insurer)
        
    entrypoint getinsurePerson(id1:string) = 
        require(alreadyInsured(id1),"person is not Insured")
        state.insurer[id1]
         
    stateful entrypoint createInsureance(fName':string, lName':string,  id1':string, idd':int,phone': int, email':string,
                                    address':string, city':string, state':string, fName2':string,
                                    lName2':string,email2':string,relation':string, phone2':int) =
        require(!alreadyInsured(id1'),"person is already Insured")
        insureDetails(fName',lName',id1',idd',phone',email',address', city', state',fName2', lName2',email2', relation', phone2')
          
          
    stateful function insureDetails(fName':string ,lName':string, id1':string , idd': int,phone': int, email':string,
                                    address':string, city':string, state':string, fName2':string,
                                    lName2':string,email2':string,relation':string, phone2':int) =
        let person = { conAddress = Call.caller, fName = fName', lName = lName', id1 = id1',idd = idd',
                       phone = phone', email = email', address = address', city=city', state=state', fName2=fName2',
                       lName2 = lName2',email2 = email2',relation= relation', phone2=phone2'}
                       
        let index  = getinsuredLength() + 1
        put( state {insurer[id1'] = person, insuredLength = index}) 
		
`;

const contractAddress = 'ct_2KgFUmGAHSnduyUNT1htXdjQnsDzzHLya3UcQkNsR39Ch3Aao8';


var client = null;
var insuredLength = 0;
var insureArray = [];

//Create a asynchronous read call for our smart contract
async function callStatic(func, args) {
  //Create a new contract instance that we can interact with
  const contract = await client.getContractInstance(contractSource, {contractAddress});
  //Make a call to get data of smart contract func, with specefied arguments
  console.log('args', args);
  console.log('func', func);
  const calledGet = await contract.call(func, args, {callStatic: true}).catch(e => console.error(e));
  console.log('calledGet', calledGet);
  //Make another call to decode the data received in first call
  const decodedGet = await calledGet.decode().catch(e => console.error(e));

  return decodedGet;
}

//Create a asynchronous write call for our smart contract
async function contractCall(func, args, value) {
  const contract = await client.getContractInstance(contractSource, {contractAddress});
  //Make a call to write smart contract func, with aeon value input
  const calledSet = await contract.call(func, args, {amount: value}).catch(e => console.error(e));
  return calledSet;
}

// $("#regBtn")
// .click(async function () {
document.getElementById('regBtn').addEventListener('click', async function(){


    var ele = document.getElementsByName('gender');     
     for(i = 0; i < ele.length; i++) { 
                if(ele[i].checked) 
               var gender=(ele[i].value); 
            } 

	var myState =document.getElementById('state');
	var mag = myState.options[myState.selectedIndex].text;
	if(mag == " "|| mag == "state")
		  {
		  	console.log ('please select a state')
		  }else{
		

        
	const fName = ($('#fName').val()),
		  lName = ($('#lName').val()),
		  // sex = gender,
		  // dob = ($('#dob').val()),
		  id1 = ($('#id1').val()),
		  idd = ($('#1d2').val()),
		  phone = ($('#phone').val()),
		  email = ($('#email').val()),
		  address = ($('#address').val()),
		  city = ($('#city').val()),
		  state = mag,
		  fName2 = ($('#fName2').val()),
		  lName2 = ($('#lName2').val()),
		  phone2 = ($('#phone2').val()),
		  email2 = ($('#email2').val()),
		  relation = ($('#relation').val());
}
		  // alert(gendar)

await contractCall('createInsureance', [fName, lName, id1, phone,
								  email, address, city, state, fName2, lName2,
								  phone2, email2, relation], 0);

		  insureArray.push({
		  	fName : fName,
		  	lName : lName,
		  	// sex   : sex,
		  	// dob : dob,
		  	id1   : id1,
		  	idd	  : idd,
		  	phone : phone,
		  	email :email,
		  	address : address,
		  	city : city,
		  	state : state,
		  		//Emergency contact details.
		  	fName2 :fName2,
		  	lName2 : lName2,
		  	phone2 : phone2,
		  	email2 : email2,
		  	relation : relation,

		  	index : insureArray.length + 1

		})
		  console.log("Insurance completed ")
		  // renderInsure();
})
// $('#regHos').click(async function(){
// 	const hName = ($('#hName').val()),
// 		  regNo = ($('#regNo').val()),
// 		  hAddress = ($('#hAddress').val()),
// 		  hstate = ($('#state').val()),
// 		  hcity = ($('#hCity').val()),
// 		  hPhone = ($('#hPhone').val()),
// 	      hemail = ($('#hEmail').val());

// 	       await contractCall('MyInsureance', [hname, regNo, hAddress, hstate, hCity, hPhone, hemail], 0);

// 		  hospitalArray.push({
// 		  	hName : hName,
// 		  	regNo : regNo,
// 		  	address : hAddress,
// 		  	state : hstate,
// 		  	city : hCity,
// 		  	Phone : hPhone,
// 		  	Email : hEmail,
// 		  	index : hospitalArray.length + 1

// 		  })
// })