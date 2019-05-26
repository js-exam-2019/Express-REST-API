const mongoose = require("mongoose");

const connect = (connection) => mongoose.connect(connection, { useNewUrlParser: true });
const disconnect = () => mongoose.disconnect();

mongoose.connection.on("connected", () => {
	console.log("Mongoose default connection open ");
});
mongoose.connection.on("disconnected", () => {
	console.log("Mongoose connection closed ");
});
mongoose.connection.on("error", (err) => {
	console.log("Mongoose default connection error: " + err);
});

module.exports = {
    connect,
    disconnect,
}
