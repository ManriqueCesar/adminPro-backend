const { Schema, model } = require ('mongoose');

const HospitalSchema = Schema ( {
    nombre: {
        type: String,
        required:true
    },
    img: {
        type: String
    },
    usuario : {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection : 'hospitales' });

HospitalSchema.method('toJSON', function () {
    const {__v , ...object} = this.toObject(); //filtro

  //  object.uid = _id; // opcional

    return object;
})

module.exports = model ( 'Hospital', HospitalSchema );