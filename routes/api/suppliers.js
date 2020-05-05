const express = require('express');

const router = express.Router();
const Supplier = require('../../models').Supplier;
const passport = require('passport');


// get all suppliers
// @route GET: /api/suppliers/
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Supplier.findAll()
        .then(users => {
            res.json(users)
        })
});

// create new Supplier
// @route POST: /api/Supplier/createSupplier
router.post('/createSupplier', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Supplier.findOne({
            where: {
                contact: req.body.contact
            }
        })
        .then(supplier => {
            if (supplier) {
                return res.status(400).json({
                    message: 'Supplier already exists'
                });
            } else {
                const newSupplier = {
                    name: req.body.name,
                    contact: req.body.contact,
                    location: req.body.location
                }

                Supplier.create(newSupplier)
                    .then(user => {
                        return res.status(200).json({
                            message: 'Supplier created sussefully'
                        })
                    })
                    .catch(err => res.json({
                        message: "Error while creating supplier, try again"
                    }))
            }
        })
})

// Update Supplier

module.exports = router;