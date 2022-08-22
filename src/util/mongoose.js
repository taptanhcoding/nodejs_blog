module.exports = {
    multipleMongooseToObject :function(mongooses)  {
       return mongooses.map(mongoose => mongoose.toObject())
    },
    mongooseToObject: function(mongoose) {
        
        var a;
        if(Array.isArray(mongoose)) [a] =  mongoose
        else a = mongoose;
        return a ? a.toObject() : a
    } 
}