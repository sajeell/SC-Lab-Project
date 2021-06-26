const express = require('express')
const router = express.Router()
const models = require('../models')

router.post('/', async (req, res) => {
  try {
    const {userId, source, destination, price, bookedOn, quantity} = req.body

    await models.History.create({
      userId: userId,
      source: source,
      destination: destination,
      price: price,
      bookedOn: bookedOn,
      quantity: quantity,
    })

    res.json('Order archived successfully')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error in archiving order')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id

    const archives = await models.History.findAll({
      where: {
        userId: id,
      },
    })

    res.json(archives)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error in getting archived orders')
  }
})

router.get('/', async (req, res) => {
  try {
    const getArchived = await models.PreviousTrip.findAll()
    res.json(getArchived)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error in getting archives backend')
  }
})

module.exports = router
