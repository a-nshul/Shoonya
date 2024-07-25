const Retreat = require('../models/RetreatModel');

const getRetreats = async (req, res) => {
  try {
    const { location, type, condition, search, page = 1, limit = 10 } = req.query;
    let query = {};

    if (location) query.location = location;
    if (type) query.type = type;
    if (condition) query.condition = condition;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    // Fetch retreats with pagination
    const retreats = await Retreat.find(query)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    // Fetch total count for pagination info
    const totalRetreats = await Retreat.countDocuments(query);

    res.status(200).json({
      retreats,
      pagination: {
        page: pageNumber,
        limit: pageSize,
        total: totalRetreats
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

const createRetreat =async(req,res)=>{
  try {
    const newRetreat = await Retreat.create(req.body);
    res.status(201).json({ newRetreat, message: 'Retreat created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { getRetreats,createRetreat };
