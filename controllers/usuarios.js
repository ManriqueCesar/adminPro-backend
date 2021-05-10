const { response } = require('express') 
const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');



const getUsuarios= async (req, res) => {

    const usuarios = await Usuario.find({},'nombre email role google');

    res.json({
        ok:true,
        usuarios,
        uid: req.uid
    })
}

const crearUsuario= async (req, res = response) => {

  const { email, password } = req.body;

  try {

    const existeEmail = await Usuario.findOne({email});
    
    if ( existeEmail) {
        return res.status(400).json({
            ok: false,
            msg: 'El correo ya está registrado' 
        })
    }
    
    const usuario = new Usuario(req.body);
    
    //Encriptar contraseña
    const salt =  bcrypt.genSaltSync(); // genera data aleatoria
    usuario.password = bcrypt.hashSync( password, salt);

    //Guardar usuario    
    await usuario.save();
  
    //Generar JWT
    const token = await generarJWT( usuario.id );

      res.json({
          ok: true,
          usuario,
          token
      })
      
  } catch (error) {
      console.log(error)
      res.status(500).json({
          ok: false,
          msg: 'Error inesperado'
      })
  }

}

const actualizarUsuario = async(req, res = response) => {
   
    const _id=  req.params.id;

    try {
        
        const usuarioDB = await Usuario.findById({_id});

        if( !usuarioDB ){
            return res.status(400).json({
                ok:false,
                msg: 'No existe un usuario con ese id'
            });
        }

        
      //actualizando
         const { password, google, email,  ...campos} = req.body;

        if ( usuarioDB.email !== email){
            delete campos.email;
                const existeEmail = await Usuario.findOne( { email })
                if( existeEmail) {
                    return res.status(400).json({
                            ok:false,
                            msg: 'Ya existe un usuario con ese email'
                    });
                }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( _id, campos, { new: true});
        
        res.json({
            ok:true,
            usuario : usuarioActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}


const borrarUsuario = async (req, res = response) => {

    const _id=  req.params.id;

    try {

        const usuarioDB = await Usuario.findById({_id});

        if( !usuarioDB ){
            return res.status(400).json({
                ok:false,
                msg: 'No existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete( _id );
        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
   
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
    
}