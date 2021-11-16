import express, { Request, Response } from 'express'
import mongodb, { ObjectId } from 'mongodb'

// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { connect } from 'http2';
import mongoose, { Connection } from 'mongoose'

// Global Variables
export const collections: { kanbans?: mongoose.Collection } = {}

// Initalise connection
export default async function connectToDatabase () {

    dotenv.config();

    // TODO: GET ENVs working, it can't seem to find the ENV data I've been trying to add to the process
    // console.log(process.env);
    // console.log(process.env.DB_CONN_STRING as string);
    // TODO: GET ENVs working


    const databaseName = "some_database2";

    const dbConnection: Connection = await mongoose.createConnection('mongodb://localhost:27017/' + databaseName);


    const kanbansCollection: mongoose.Collection = dbConnection.collection("some_collection2");

    collections.kanbans = kanbansCollection;

    dbConnection.on('connected', function() {
        console.log(`Successfully connected to database: ${databaseName} and collection: ${kanbansCollection.collectionName}`);
    });
}