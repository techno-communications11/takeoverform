import mongoose from "mongoose";

const { Schema } = mongoose;

const takeoverSchema = new Schema({
    name: {
        type:String,
        require:true
    },
    storeName: {
        type:String,
        require:true
    },
    takeOverDate: {
        type:String,
        require:true
    },
    alarmCode: {
        type:String,
        require:true
    },
    wifiName: {
        type:String,
        require:true
    },
    wifiCode: {
        type:String,
        require:true
    },
    safeBoxCode: {
        type:String,
        require:true
    },
    lunchBoxCode: {
        type:String,
        require:true
    },
    doorCode: {
        type:String,
        require:true
    },
    dumpsterCode: {
        type:String,
        require:true
    },
    citrixCount: {
        type:String,
        require:true
    },
    yuniKeys: {
        type:String,
        require:true
    },
    iphone11: {
        type:String,
        require:true
    },
    iphoneSE: {
        type:String,
        require:true
    },
    iphone12: {
        type:String,
        require:true
    },
    iphone13: {
        type:String,
        require:true
    },
    iphone15: {
        type:String,
        require:true
    },
    iphone16: {
        type:String,
        require:true
    },
    gsp: {
        type:String,
        require:true
    },
    creditCard: {
        type:String,
        require:true
    },
    camera: {
        type:String,
        require:true
    },
    inventoryAudit: {
        type:String,
        require:true
    },
    shipment: {
        type:String,
        require:true
    },
    storeImages: {
        type:[String],
        require:true
    },
},{timestamps:true, strict: false});

const takeoverModule= mongoose.model('takeover',takeoverSchema);


export default takeoverModule;