import express, { Request, Response } from 'express'
import mongodb, { ObjectId } from 'mongodb'

// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { kanbans?: mongoDB.Collection } = {}

// Initalise connection
export default async function connectToDatabase () {

    dotenv.config();

    // TODO: GET ENVs working, it can't seem to find the ENV data I've been trying to add to the process
    // console.log(process.env);
    // console.log(process.env.DB_CONN_STRING as string);
    // TODO: GET ENVs working

    // const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);
    const client: mongoDB.MongoClient = new mongoDB.MongoClient("mongodb://localhost:27017");

    await client.connect();

    // const db: mongoDB.Db = client.db(process.env.DB_NAME);
    const db: mongoDB.Db = client.db("some_database");


    // const kanbansCollection: mongoDB.Collection = db.collection(process.env.GAMES_COLLECTION_NAME as string);
    const kanbansCollection: mongoDB.Collection = db.collection("some_collection");

    collections.kanbans = kanbansCollection;
        
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${kanbansCollection.collectionName}`);
}
