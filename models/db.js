var mongoose = require("mongoose");
// var mongoURI = process.env.MONGODB_URI;
// var mongoURI = "mongodb://localhost:27017/test"
//"mongodb+srv://abduldb:abduldb123@cluster0.zfzf3.mongodb.net/test?retryWrites=true&w=majority" 

mongoose.connect(mongoURI,{useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${mongoURI}`);
});
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error:", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});
mongoose.model

// For nodemon restarts
process.once("SIGUSR2", () => {
  gracefulShutdown("nodemonrestart", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});
// For app termination
process.on("SIGINT", () => {
  gracefulShutdown("app termination", () => {
    process.exit(0);
  });
});
// For Herokuapp termination
process.on("SIGTERM", () => {
  gracefulShutdown("Herokuapp shutdown", () => {
    process.exit(0);
  });
});

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};
module.exports = mongoose;