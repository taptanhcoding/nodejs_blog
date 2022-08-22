module.exports = {
    multipleMongooseToObject :function(mongooses)  {
       return mongooses.map(mongoose => mongoose.toObject())
    },
    mongooseToObject: function(mongoose) {
        const [a] = mongoose
        return a ? a.toObject() : a
    } 
}