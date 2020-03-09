const contractSource =`
payable contract Insureance = 
    type i = int
    type s = string
    type a = address
    type b = bool
	
    record insure =
        { conAddress  : address,
          fName       : string,
          lName       : string,
          // sex 		  : string, 
          id1         : string, 
          // idd         : int,
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
    
    entrypoint alreadyInsured(ident :  s) : bool = 
        Map.member(ident , state.insurer)
        
    entrypoint getinsurePerson(id1:string) = 
        require(alreadyInsured(id1),"person is not Insured")
        state.insurer[id1]
         
    stateful entrypoint createInsureance(fName': s, lName': s,  id1': s,phone': int, email': s,address': s, city': s, 
  										 state': s, fName2': s, lName2': s,email2': s,relation': s, phone2':int) =
        require(!alreadyInsured(id1'),"person is already Insured")
        insureDetails(fName',lName',id1',phone',email',address', city', state',fName2', lName2',email2', relation', phone2')
          
          
    stateful function insureDetails(fName': s ,lName': s, id1': s, phone': int, email': s,address': s, city': s, state': s,
  								    fName2': s, lName2': s,email2': s,relation': s, phone2':int) =
        let person = { conAddress = Call.caller, fName = fName', lName = lName',
        			   id1 = id1', phone = phone', email = email',
        			   address = address', city=city', state=state',
        			   fName2=fName2',lName2 = lName2',email2 = email2',
        			   relation= relation', phone2=phone2'}              
        let index  = getinsuredLength() + 1
        put( state {insurer[id1'] = person, insuredLength = index}) 

		
`;

// const contractAddress ='ct_hthqd1oqWjiVTjJ8PQWenNFWmNifUyQWSbyUsmVTtC9XGmHXM';
const contractAddress='ct_2rCR9HebjFTMD5PQ1LpbzYdTzzm5ciVQepHzvkEUTmsUbY5C3N';

var client = null;
var insuredLength = 0;
var insuredArray = [];

function renderInsure(){   
  var template = $('#template').html();
  Mustache.parse(template);
  var rendered = Mustache.render(template, {insuredArray});
  $('#insured').html(rendered);
}

async function callStatic(func, args) {
  //Create a new contract instance that we can interact with
  const contract = await client.getContractInstance(contractSource, {
    contractAddress
  });

  const calledGet = await contract
    .call(func, args, {
      callStatic: true
    }) .catch(e => console.error(e));

  const decodedGet = await calledGet.decode().catch(e => console.error(e));
  console.log("insured person : ", decodedGet);
  return decodedGet;
}

async function contractCall(func, args, value) {
  const contract = await client.getContractInstance(contractSource, {
    contractAddress
  });
  //Make a call to write smart contract func, with aeon value input
  const calledSet = await contract
    .call(func, args, {
      amount: value
    })
    .catch(e => console.error(e));

  return calledSet;
}


 window.addEventListener('load', async() => {
   //Display the loader .
  $("#loader").show();

  client = await Ae.Aepp();

  var insuredLength = await callStatic('getinsuredLength', []); 
  console.log('persons :' +insuredLength)

  for (let i = 1; i <= insuredLength; i++) {

//call to the blockchain to get saved data
  const insure = await callStatic('getinsurePerson', ['A2020']);

//Display our foods from  blockchain
    insuredArray.push({
      // name: foody.name,
      fName: insure.fName,
      lName: insure.lName,
      id1 : insure.id1,
      index :i,  
    })
  }
  console.log("done getting")
  $("#loader").hide();
  renderInsure();


})




// $("#regBtn")
// .click(async function () {
document.getElementById('regBtn').addEventListener('click', async function(){
$('#loader').show();

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
		  // idd = ($('#1d2').val()),
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
		  console.log(email2)
		  console.log(fName2)
 // const index = await callStatic('getinsurePerson', [])

 // const sure = await contractCall("createInsureance", [fName, lName, id1, phone,email,
 // 										 address, city, state, fName2,
 // 										 lName2, phone2, email2, relation],0);

	// 	  insuredArray.push({
	// 	  	fName : sure.fName,
	// 	  	lName : sure.lName,
	// 	  	// sex   : sex,
	// 	  	// dob : dob,
	// 	  	id1   : sure.id1,
	// 	  	// idd	  : idd,
	// 	  	phone : sure.phone,
	// 	  	email : sure.email,
	// 	  	address : sure.address,
	// 	  	city : sure.city,
	// 	  	state : sure.state,
	// 	  		//Emergency contact details.
	// 	  	fName2 : sure.fName2,
	// 	  	lName2 : sure.lName2,
	// 	  	phone2 : sure.phone2,
	// 	  	email2 : sure.email2,
	// 	  	relation : sure.relation,

	// 	  	index : insureArray.length + 1

	// 	})
		  $('#loader').hide();
		  console.log("Insurance completed ");
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