const WebSocket = require('ws');

const clientWebSocket = new WebSocket('ws://localhost:23889');

clientWebSocket.on('close', () => {
	console.log("Server connection closed");
});

clientWebSocket.on('error', (e) => {
	console.log("Error: ", e.message);
});


clientWebSocket.on('message', (message) => {
	console.log("Received: ", message.toString());
});

clientWebSocket.on('open', ()=> {
	console.log("Server connection opened");
	sendSomething();
});

function sendSomething() {
	const rpcObj = '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}';
	console.log("Sending RPC: ", rpcObj);
	clientWebSocket.send(rpcObj);
}
