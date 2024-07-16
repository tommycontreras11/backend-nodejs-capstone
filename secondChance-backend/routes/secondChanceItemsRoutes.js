const express = require('express')
const multer = require('multer')
const router = express.Router()
const connectToDatabase = require('../models/db')
const logger = require('../logger')

const directoryPath = 'public/images'

const storage = multer.diskStorage({
  destination (_req, _file, cb) {
    cb(null, directoryPath)
  },
  filename (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

router.get('/', async (_req, res, next) => {
  logger.info('/ called')
  try {
    const db = await connectToDatabase()
    const collection = db.collection('secondChanceItems')
    const secondChanceItems = await collection.find({}).toArray()
    return res.json(secondChanceItems)
  } catch (e) {
    logger.error('oops something went wrong', e)
    next(e)
  }
})

router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    const db = await connectToDatabase()
    const collection = db.collection('secondChanceItems')
    let secondChanceItem = req.body

    const lastItemQuery = await collection.find().sort({ 'id': -1 }).limit(1)
    await lastItemQuery.forEach(item => {
      secondChanceItem.id = (parseInt(item.id) + 1).toString()
    })

    secondChanceItem.id = secondChanceItem.id ? secondChanceItem.id : "1"

    const dateAdded = Math.floor(new Date().getTime() / 1000)
    secondChanceItem.dateAdded = dateAdded

    secondChanceItem = await collection.insertOne(secondChanceItem)

    return res.status(201).json(secondChanceItem)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const db = await connectToDatabase()
    const collection = db.collection('secondChanceItems')
    const secondChanceItem = await collection.findOne({ id })

    if (!secondChanceItem) {
      return res.status(404).json({ message: 'secondChanceItem not found' })
    }

    return res.json(secondChanceItem)
  } catch (e) {
    next(e)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const db = await connectToDatabase()
    const collection = db.collection('secondChanceItems')
    const secondChanceItem = await collection.findOne({ id })

    if (!secondChanceItem) {
      logger.error('secondChanceItem not found')
      return res.status(404).json({ message: 'secondChanceItem not found' })
    }

    secondChanceItem.category = req.body.category
    secondChanceItem.condition = req.body.condition
    secondChanceItem.age_days = req.body.age_days
    secondChanceItem.description = req.body.description
    secondChanceItem.age_years = Number((secondChanceItem.age_days / 365).toFixed(1))
    secondChanceItem.updatedAt = new Date()

    const updatePreLoveItem = await collection.findOneAndUpdate(
      { id },
      { $set: secondChanceItem },
      { returnDocument: 'after' }
    )

    if (updatePreLoveItem) {
      return res.json({ uploaded: 'success' })
    } else {
      return res.json({ uploaded: 'failed' })
    }
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const db = await connectToDatabase()
    const collection = db.collection('secondChanceItems')
    const secondChanceItem = await collection.findOne({ id })

    if (!secondChanceItem) {
      logger.error('secondChanceItem not found')
      return res.status(404).json({ message: 'secondChanceItem not found' })
    }

    await collection.deleteOne({ id })
    return res.json({ deleted: 'success' })
  } catch (e) {
    next(e)
  }
})

module.exports = router
