import mongoose from "mongoose";
import { UserData } from "../AllInterfaces/AllInterface";

interface MainData extends UserData,mongoose.Document{}

const UserSchema = new mongoose.Schema({

})