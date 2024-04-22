const User = require('../models/User');


exports.addUser = async (req, res, next) => {
  const { firstName, lastName, avatar } = req.body;
  if (!firstName || !lastName || !avatar) {
      return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(200).json(newUser);
  } catch (error) {
      next({ message: 'Internal server error', error: error.message });
  }
};


exports.getUsers = async (req, res, next) => {
  try {
    // Fetch only users with the role 'user' and only retrieve their '_id'
    const users = await User.find({ role: 'user' }, '_id');

    // Create an array of user IDs
    const userIds = users.map(user => user._id);

    // Prepare the response containing user IDs and the total count
    const response = {
      count: userIds.length,
      userIds: userIds
    };

    res.status(200).json(response);
  } catch (error) {
    next({ message: 'Internal server error', error: error })
  }
};



exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      next({ message: 'Internal server error' })
    }
    res.status(200).json(user);
  } catch (error) {
    next({ message: 'Internal server error' })
  }
};



exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      next({ message: 'Internal server error' })
    }
    res.status(200).json(user);
  } catch (error) {
    next({ message: 'Internal server error' })
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      next({ message: 'Internal server error' })
    }
    res.status(200).json(user);
  } catch (error) {
    next({ message: 'Internal server error' })
  }
};
