const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/pumpBookDb";

if (!mongoURI) {
    console.error('MongoDB URI is not defined in environment variables');
    process.exit(1); // Exit the process with failure
}

mongoose.connect(mongoURI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the process with failure
});

module.exports = mongoose;