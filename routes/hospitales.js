
/*
    ruta: /api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital

} = require('../controllers/hospitalesController');


const router = Router();

router.get( '/' , getHospitales );

//validaciones al insertar
router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty()    ], 
    crearHospital );

router.put( '/:id', 
    [        
    ], 
    actualizarHospital );

 router.delete( '/:id',  
    borrarHospital )


module.exports = router;