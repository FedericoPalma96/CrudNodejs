const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const conexion = require('./database/db')

router.get('/',(req,res)=>{
     conexion.query('SELECT * FROM users',(error,results)=>{
         if(error){
             throw error;
         }else{
            res.render('index',{results:results})
         }
     })
})
// Crear registros
router.get('/create',(req,res)=>{
    res.render('create');
})

// Ruta -- editar
router.get('/edit/:id',(req,res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM users WHERE id=?',[id],(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('edit.ejs',{user:results[0]})
        }
    });
});

//Ruta -- eliminar
router.get('/delete/:id',(req,res)=>{
    const id = req.params.id;
    conexion.query('DELETE FROM users WHERE id = ?',[id],(error,results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/')
        }
    })
})
// router.get('/edit/:id', (req,res)=>{    
//     const id = req.params.id;
//     conexion.query('SELECT * FROM users WHERE id=?',[id] , (error, results) => {
//         if (error) {
//             throw error;
//         }else{            
//             res.render('edit.ejs', {user:results[0]});            
//         }        
//     });
// });


// router.get('/contactos',(req,res)=>{
//     res.send('hola')
   
    
// })

// router.get('/help',(req,res)=>{
//     res.send('a')
// })




const crud = require('./controllers/crud');

router.post('/save', crud.save);
router.post('/update', crud.update);

module.exports = router;

// const crud = require('./controllers/crud');
// router.post('/save',crud.save);
// router.post('/update',crud.update);



// module.exports = router;