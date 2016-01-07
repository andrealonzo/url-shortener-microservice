'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var counter = mongoose.model('counter', CounterSchema);

var Url = Schema({
        id:{type: Number, default:0, unique: true},
        value:{type: String, unique: true}
    });


Url.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} },{upsert:true,new:true}, function(error, counter)   {
        if(error)
            return next(error);
        doc.id = counter.seq;
        next();
    });
});
    
module.exports = mongoose.model('Url',Url);