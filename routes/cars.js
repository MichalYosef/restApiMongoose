const express = require('express');
const router = require('express-promise-router')(); // built in try catch

const CarsController = require('../controllers/cars');

const { 
    validateParam, 
    validateBody, 
    schemas 
} = require('../helpers/routeHelpers');


router.route('/')
    .get( CarsController.index )
    .post( validateBody(schemas.carSchema), CarsController.newCar);

// cars/:id
router.route('/:carId')
    .get( validateParam( schemas.idSchema, 'carId'), CarsController.getcar )
    .put( [validateParam( schemas.idSchema, 'carId'), // put = replace (all fields must exist on replace)
           validateBody( schemas.putCarSchema)], 
           CarsController.replaceCar )
    .patch( [validateParam( schemas.idSchema, 'carId'), // patch = update (fields are optional on update)
             validateBody( schemas.patchCarSchema)], 
            CarsController.updateCar ) 
    .delete( validateParam( schemas.idSchema, 'carId'), CarsController.deleteCar );

// router.route('/:carId/sellers')
//     .get(  validateParam( schemas.idSchema, 'carId') ,CarsController.getUserCars )
//     .post( [validateParam( schemas.idSchema, 'carId'),
//             validateBody( schemas.carSchema)], 
//             CarsController.newUserCar);

module.exports = router;

