var userMsgs = [];
var users = [];

function login(request, response) {
	console.log('LOGIN!!!');
	console.log('---------------------------------------------');
	console.log('User want to login: ');
	console.log(request.body);
	

	var user = request.body;
	user.id = users.length;
	user.available = true;
	user.msgsCount = 0;
	userMsgs[user.id] = [];
	users[user.id] = user;

	console.log('UsrID: ' + user.id);
	console.log('---------------------------------------------');

	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify(user));
}

function relogin(request, response) {
	users[request.params.id_user].available = true;
	
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify(user));
}

function logout(request, response) {
	users[request.params.id_user].available = false;
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify(users[request.params.id_user]));
}

function userList(request, response) {
	console.log('---------------------userList------------------------');
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify(users));
}

function status(request, response) {
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify(users));
}

function getMessages(request, response) {
	var msgs = userMsgs[request.params.id_user];
	userMsgs[request.params.id_user] = [];
	users[request.params.id_user].msgsCount = 0;
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify(msgs));
}

function sendMessage(request, response) {
	console.log('---------------------------------------------');
	console.log('Server sent a message: ');
	console.log(request.body);
	console.log('---------------------------------------------');

	if (users[request.params.id_user].available) {
		users[request.params.id_user].msgsCount++;
		if (request.body.type == 0) {
			request.body.type = 1;
		}
		userMsgs[request.params.id_user].push(request.body);
		response.writeHead(200, {"Content-Type": "application/json"});
		response.end(JSON.stringify({status: 1}));
	} else {
		response.writeHead(200, {"Content-Type": "application/json"});
		response.end(JSON.stringify({status: 0}));
	}
}

exports.userMsgs = userMsgs;
exports.login = login;
exports.relogin = relogin;
exports.logout = logout;
exports.status = status;
exports.getMessages = getMessages;
exports.sendMessage = sendMessage;
exports.userList = userList;