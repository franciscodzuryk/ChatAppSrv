var userMsgs = [];
var users = [];

function login(request, response) {
	var user = request.body;
	user.id = users.length;
	user.available = true;
	user.msgsCount = 0;
	userMsgs[user.id] = [];
	users[user.id] = user;

	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify(user));
}

function logout(request, response) {
	users[request.params.id_user].available = false;
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify(users[request.params.id_user]));
}

function userList(request, response) {
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
exports.logout = logout;
exports.getMessages = getMessages;
exports.sendMessage = sendMessage;
exports.userList = userList;