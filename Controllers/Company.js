var companyMsgs = [];
var companyData = {
		name : 'No Company Active',
		status: 0
	};

function login(request, response) {
	companyData = request.body;
	companyData.status = 1;
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify(companyData));
}

function logout(request, response) {
	companyData.name = 'No Company Active';
	companyData.status = 0;
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify(companyData));
}

function status(request, response) {
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify(companyData));
}

function getMessages(request, response) {
	var msgs = [];
	if(typeof companyMsgs[request.params.id_user] !== 'undefined') {
	    var msgs = companyMsgs[request.params.id_user];
	}
	
	companyMsgs[request.params.id_user] = [];
	
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify(msgs));
}

function getAllMessages(request, response) {
	var msgs = [];
	if(typeof companyMsgs !== 'undefined') {
	    var msgs = generateDic(companyMsgs);
	}

	companyMsgs = [];	
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify(msgs));
}

function sendMessage(request, response) {

	if (companyData.status == 1) {
		if (request.body.type == 0) {
			request.body.type = 1;
		}
		if(typeof companyMsgs[request.body.user_id] === 'undefined') {
	    	companyMsgs[request.body.user_id] = [];
		}
		companyMsgs[request.body.user_id].push(request.body);
		response.writeHead(200, {"Content-Type": "application/json"});
		response.end(JSON.stringify({status: 1}));
	} else {
		response.writeHead(200, {"Content-Type": "application/json"});
		response.end(JSON.stringify({status: 0}));
	}
}

function generateDic(obj) {
	var result = [];
	for (var key in obj) {
		result.push({
		  userId:  parseInt(key),
		  msgs: obj[key]
		});
	}
	return result;
}

exports.login = login;
exports.logout = logout;
exports.status = status;
exports.getMessages = getMessages;
exports.sendMessage = sendMessage;
exports.getAllMessages = getAllMessages;
