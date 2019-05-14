const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({

    firstName: String,
    lastName: String,
    nickName: String,
    gender: String,
    email: { type : String , unique : true, required : true},
    cognitoUserId: { type : String, unique : true },
    phoneNumber: String,
    dateOfBirth: String,
    nationality: String,
    cityOfBirth: String,
    countryOfBirth: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    zipCode: String,
    country: String,
    cardUsage:String,
    monthlyChargeAmount:Number,
    monthlyExpensesAmount:Number,
    occupation:String,    
    isOnboarded: Boolean, 
    onboardDate: Date,
    poaId: { type: Schema.Types.ObjectId, ref: 'Poa' }, //Proof of Address Id._id
    poiId: { type: Schema.Types.ObjectId, ref: 'Poi' }, //Proof of Identity Id
    beneficiariesIds: [{ type: Schema.Types.ObjectId, ref: 'Beneficiary' }],
    kycFolderId: { type: Schema.Types.ObjectId, ref: 'KYCFolder' }, 
    isCustomer: Boolean, 
    customerId: String, //id of the customer
    accountId: String, // account id


    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    deletedAt: Date,

});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });



 userSchema.virtual('poi', {
    ref: 'Poi',
    localField: 'poiId',
    foreignField: '_id',
    justOne: true
  });


  userSchema.virtual('beneficiaries', {
    ref: 'Beneficiary',
    localField: 'beneficiariesIds',
    foreignField: '_id',
    justOne: false
  });

  userSchema.virtual('poa', {
    ref: 'Poa',
    localField: 'poaId',
    foreignField: '_id',
    justOne: true
  });


  


/// userSchema.set('strict', false); 

userSchema.pre('save', function (next) {

    mongoose.model('User').find({email : this.email},  (err, docs) => {

        if (!docs.length){
            next();
        }else{                
            next("User with email : "+this.email+" early exists!");
        }
    });
});


userSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
  });


    // userSchema.post('findOne', function(doc) {


    //     mongoose.model('Poi').findById(this.poiId).exec().then( 

    //         poi => {

    //             console.log('this fired after you run a find query', doc, this.poiId, poi);
    //             doc.poi = 'test' ;
    //         }
    //     );

        



    //     // next();

    // });

    userSchema.methods.getPoi = function(poiId) {


    return mongoose.model('Poi').findById(poiId).exec();

  };

  userSchema.methods.getPoa = function(poaId) {

    return mongoose.model('Poa').findById(poaId).exec();
    
  };


  userSchema.methods.getBeneficiaries = function(cb) {


    let bids = this.beneficiariesIds.map(ele => new mongoose.Types.ObjectId(ele));

    return this.model('Beneficiary').find({}).in(bids).exec(cb);
    
  };

userSchema.pre('find', function() {
    this.where({deletedAt: {$exists: false }});
});




module.exports = mongoose.model('User', userSchema);