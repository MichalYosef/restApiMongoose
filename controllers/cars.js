const Car = require('../models/car');
const User = require('../models/user');

module.exports = {

    // Validation: no
    index: async ( req, res, next ) => 
    {
        const cars = await Car.find({});
        res.status(200).json(cars);        
    },

    // Validation: no
    newCar: async(req, res, next) => 
    {
        // find the actual seller
        const seller =  await User.findById(req.value.body.seller);
        // create new car
        const newCar = req.value.body; 
        delete newCar.seller;
        
        const car = new Car(newCar);
        car.seller = seller;

        await car.save();

        // add newly created car to the actual seller
        seller.cars.push(car);
        await seller.save();

        res.status(200).json(car);
    },

    // Validation: DONE
    getcar: async(req, res, next) => 
    {
        // const { carId } = req.params.carId ; // this is after validation in Joi
        
        const car = await Car.findById( req.value.params.carId );
        res.status(200).json(car);
    },

    // // Validation: no
    replaceCar :  async(req, res, next) => 
    {
        // enforce that req.body must contain all the fields
        const { carId } = req.value.params ;
        const newCar = req.value.body;

        const result = await Car.findByIdAndUpdate( carId, newCar );
        res.status(200).json({ success: true});
    },

    // // Validation: no
    updateCar :  async(req, res, next) => 
    {
        // req.body may contain number of fields
        const { carId } = req.value.params ;
        const newCar = req.value.body;

        const result = await Car.findByIdAndUpdate( carId, newCar );
        res.status(200).json({ success: true});
    },

    deleteCar : async(req, res, next) => 
    {
        const { carId } = req.value.params ;
        
        const car = await Car.findById( carId );

        if(!car)
        {
            return res.status(404).json({error: 'Car doesnt exist'});
        }

        const sellerId = car.seller;
        const seller = await User.findById( sellerId);

        await car.remove();

        seller.cars.pull(car);
        await seller.save();

        res.status(200).json({success:true});
    },

     // Validation: no
    getcarCars: async( req, res, next) =>
    {
        const { carId } = req.value.params ;
        const car = await car.findById(carId).populate('cars');
        res.status(200).json(car.cars);
    },
 
    // // Validation: no
    // newCarCar: async( req, res, next) =>
    // {
    //     const { carId } = req.value.params ;
    //     // Create new car
    //     const newCar = new Car( req.value.body );
        
    //     // Get car
    //     const car = await car.findById(carId);
    //     // Assign car as car's seller
    //     newCar.seller = car;
    //     //save the car
    //     await newCar.save();
    //     // add car to the  car's selling array 'cars'
    //     car.cars.push( newCar );
    //     // Save the car
    //     await car.save();

    //     res.status(200).json(newCar);

    // }

};
