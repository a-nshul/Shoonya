const { pick } = require('lodash');
const Retreat = require('../models/RetreatModel');

const getRetreats = async (req, res) => {
  try {
    const { page = 1, limit = 10, location } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const filter = pick(req.query, ['location']);
    const query = {};

    if (filter.location) {
      query.location = new RegExp(`^${filter.location}$`, 'i'); 
    }


    const retreats = await Retreat.paginate(query, options);

    res.status(200).json({
      success: true,
      data: retreats.docs,
      total: retreats.totalDocs,
      page: retreats.page,
      totalPages: retreats.totalPages,
      limit: retreats.limit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

const createRetreat = async (req, res) => {
  try {
    const newRetreat = await Retreat.create(req.body);
    res.status(201).json({ newRetreat, message: 'Retreat created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getRetreats, createRetreat };
