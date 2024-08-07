const e = require('express');
const express = require('express');
const router = express.Router();

const products = require('../json/personal.json');

router.get('/', (req, res) => {
  res.json(products);
});

router.post('/', (req, res) => {
  const { cedula, nombre, email, direccion, comuna, telefono, obra, seccion, turno } = req.body;
  if (cedula && nombre && email && direccion && comuna && telefono && obra && seccion && turno) {
      const id = products.length + 1;
      const newProduct = {id, ...req.body};
      //console.log(newMovie);
      //res.json('saved');
      products.push(newProduct);
      res.json(products);
  } else {
      //res.send('Wrong Request');
      res.status(500).json({error: 'There was an error.'});
  }
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { cedula, nombre, email, direccion, comuna, telefono, obra, seccion, turno } = req.body;
  if (cedula && nombre && email && direccion && comuna && telefono && obra && seccion && turno) {
    products.forEach((product, i) => {
      if (product.id == id) {
        product.cedula = cedula;
        product.nombre = nombre;
        product.email = email;
        product.direccion = direccion;
        product.comuna = comuna;
        product.telefono = telefono;
        product.obra = obra;
        product.seccion = seccion;
        product.turno = turno;
      }
    });
    res.json(products);
  } else {
    res.status(500).json({error: 'There was an error.'});
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  products.forEach((product, i) => {
    if(product.id == id) {
      products.splice(i, 1);
    }
  });
  res.json('Successfully deleted');
});

module.exports = router;