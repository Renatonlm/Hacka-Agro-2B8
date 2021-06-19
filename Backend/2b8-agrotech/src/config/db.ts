import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/2b8health', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));