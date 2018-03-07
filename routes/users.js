const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')(); // built in try catch

const UserController = require('../controllers/users');

const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');


router.route('/')
    .get( UserController.index )
    .post( validateBody(schemas.userSchema), UserController.newUser);

// users/:id
router.route('/:userId')
    .get( validateParam( schemas.idSchema, 'userId'), UserController.getUser )
    .put( [validateParam( schemas.idSchema, 'userId'), // put = replace (all fields must exist on replace)
           validateBody( schemas.userSchema)], 
          UserController.replaceUser )
    .patch( [validateParam( schemas.idSchema, 'userId'), // patch = update (fields are optional on update)
             validateBody( schemas.userOptionalSchema)], 
            UserController.updateUser ) 
    .delete(  UserController.deleteUser );

router.route('/:userId/cars')
    .get(  validateParam( schemas.idSchema, 'userId') ,UserController.getUserCars )
    .post( [validateParam( schemas.idSchema, 'userId'),
            validateBody( schemas.userCarSchema)], 
            UserController.newUserCar);

module.exports = router;

