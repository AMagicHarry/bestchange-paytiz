require('dotenv/config');
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./db/db');
const User = require('./models/User')
const mongoose = require('mongoose')
const {faker} = require('@faker-js/faker');
const Exchanger = require('./models/Exchanger')
const { getCode, getName } = require('country-list');
const Blog = require('./models/Blog')
const Referral = require('./models/Referral')
const Review = require('./models/Review')




const app = express();


const port = process.env.PORT || 4000;

const allowedOrigins = ['https://bingo-samp-2.vercel.app', `http://localhost:5173`];

const corsOptions = {
  origin: function (origin, callback) {
       console.log(origin)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}


app.use(cors(corsOptions));

app.use(express.json());

const userRoutes = require('./routes/user');
const exchangerRoutes = require('./routes/exchanger');
const blogRoutes = require('./routes/blog')
const reviewRoutes = require('./routes/review')
// // const paymentRoutes = require('./routes/payment')
// const winnerRoutes = require('./routes/winner')



app.use('/api/user', userRoutes);
app.use('/api/exchanger', exchangerRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/review', reviewRoutes);
// // app.use('/api/payment', paymentRoutes);
// app.use('/api/winner',winnerRoutes)


const createReferrals = async (req, res) => {
  try {
      const allUsers = await User.find({}); // Fetch all users
      let referralsPromises = [];

      for (const user of allUsers) {
          const numberOfReferrals = Math.floor(Math.random() * 4) + 3; // Random number between 3 and 6
          const referredUsers = allUsers.filter(u => u.id !== user.id); // Exclude the current user from possible referrals

          const referralsForUser = shuffleArray(referredUsers).slice(0, numberOfReferrals);
          let newReferrals = [];

          for (const referred of referralsForUser) {
              const newReferral = new Referral({
                  referrer: user._id,
                  referred: referred._id
              });
              newReferrals.push(newReferral.save()); // Save each referral and push the promise
          }

          // Wait for all referral promises to resolve
          const savedReferrals = await Promise.all(newReferrals);

          // Collect the IDs of saved referrals
          const referralIds = savedReferrals.map(referral => referral._id);

          // Update the user document with new referral IDs
          user.referrals.push(...referralIds);
          referralsPromises.push(user.save());
      }

      // Wait for all user updates to complete
      await Promise.all(referralsPromises);

      res.status(201).json({
          message: "Referrals created successfully",
      });
  } catch (error) {
      console.error('Error creating referrals:', error);
      res.status(500).json({
          message: 'Error creating referrals',
          error: error.message
      });
  }
};

// Utility function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}



const addUsernameToUsers = async (req,res) => {
  try {

      const users = await User.find({});

      const updatePromises = users.map(user => {
          const username = faker.internet.userName({firstName:user.firstName, lastName:user.lastName});
          return User.updateOne({ _id: user._id }, { username });
      });

      await Promise.all(updatePromises);

      res.status(201).json({
        message: "All users created successfully",
        users: users
    });
      
    } catch (error) {
      res.status(500).json({
        message: 'Error creating users',
        error: error.message
    });
  } 
};


const getRandomDate = (startDate, endDate) => {
  return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
}




const createUser = async (role, createdAtDate) => {
  const countryName = faker.location.country();
  const countryCode = getCode(countryName);
  console.log(countryCode)

  return new User({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    userName: faker.internet.userName(),
    avatar: faker.image.avatar(),
    country: countryName,
    countryCode: countryCode,
    role: role,
    totalEarnings: faker.finance.amount({ min: 0, max: 1000, dec: 0 }), 
    totalWithdrawal: faker.finance.amount({ min: 0, max: 500, dec: 0 }), 
    availableForWithdrawal: faker.finance.amount({ min: 0, max: 500, dec: 0 }), 
  }).save();
};



const createUsers = async (req, res) => {
  try {
      await mongoose.connection.dropCollection('users');
      console.log('User collection dropped');

      const users = [];
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      for (let i = 0; i < 150; i++) {
          const randomDate = getRandomDate(lastMonth, new Date());
          users.push(await createUser('user', randomDate));
      }

      res.status(201).json({
          message: "All users created successfully",
          users: users
      });
  } catch (error) {
      console.error('Error creating users', error);
      res.status(500).json({
          message: 'Error creating users',
          error: error.message
      });
  } 
};


const createExchangers = async (req,res) => {
  try {
    const users = await User.find().select('_id');
    const exchangers = [];

    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    for (let user of users) {
      const randomDate = getRandomDate(lastMonth, new Date())
      const newExchanger = new Exchanger({
        user: user._id,
        currency: faker.finance.currency(),
        avatar: faker.image.avatar(),
        website: faker.internet.url(),
        name: faker.company.buzzNoun(),
        rating: faker.number.int({ min: 1, max: 5 }),
        rateRange: {
          min: faker.number.float({ min: 0.1, max: 70 }),
          max: faker.number.float({ min: 80, max: 100 })
        },
        siteOn: faker.datatype.boolean(),
        isActive: faker.datatype.boolean(),
        verified: faker.datatype.boolean(),
        legalRegistration: faker.datatype.boolean(),
        createdAt: randomDate, 
        updatedAt: randomDate 
      }).save({ timestamps: { createdAt: randomDate, updatedAt: randomDate } });
      
      exchangers.push(newExchanger); 
    }
    const allexchangers = await Promise.all(exchangers);
    res.status(201).json({
      message: "All users created successfully",
      exchangers:allexchangers
  });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating users',
      error: error.message
  });
  } 
};


const createBlogs = async (req, res) => {
  try {
      const users = await User.find().select('_id').limit(20);

      const blogPromises = [];
      users.forEach(user => {
          for (let i = 0; i < 2; i++) {
              const newBlog = new Blog({
                  user: user._id,
                  title: faker.lorem.sentence(),
                  content: faker.lorem.paragraphs(),
                  avatar: faker.image.avatar(),
              });
              blogPromises.push(newBlog.save());
          }
      });

      const createdBlogs = await Promise.all(blogPromises);
      console.log("Blogs created successfully for the first 20 users");
      res.status(201).json({
          message: "Blogs created successfully for the first 20 users",
          blogs: createdBlogs
      });
  } catch (error) {
      console.error('Error creating blogs:', error);
      res.status(500).json({
          message: 'Error creating blogs',
          error: error.message
      });
  }
};



async function createReviewsForExchangers(req, res) {
  try {
      const allExchangers = await Exchanger.find({}); // Fetch all exchangers
      const allUsers = await User.find({}); // Fetch all users
      let reviewsPromises = [];

      for (const exchanger of allExchangers) {
          const numberOfReviews = faker.number.int({min: 1, max: 10}); // Random number of reviews
          const reviewers = shuffleArray(allUsers).slice(0, numberOfReviews); // Select random users for reviews

          let newReviews = [];

          for (const reviewer of reviewers) {
              const newReview = new Review({
                  user: reviewer._id,
                  content: faker.lorem.sentence(),
                  rating: faker.number.int({min: 1, max: 5})
              });
              newReviews.push(newReview.save()); // Save each review and push the promise
          }

          // Wait for all review promises to resolve
          const savedReviews = await Promise.all(newReviews);

          // Collect the IDs of saved reviews
          const reviewIds = savedReviews.map(review => review._id);

          // Update the exchanger document with new review IDs
          exchanger.reviews.push(...reviewIds);
          reviewsPromises.push(exchanger.save());
      }

      // Wait for all exchanger updates to complete
      await Promise.all(reviewsPromises);

      res.status(201).json({
          message: "Reviews created and assigned to exchangers successfully",
      });
  } catch (error) {
      console.error('Error creating reviews for exchangers:', error);
      res.status(500).json({
          message: 'Error creating reviews for exchangers',
          error: error.message
      });
  }
};


// Utility function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}




console.log(faker.finance.currency())


app.post('/fake-data',createUsers)
app.post('/fake-data-exchanger',createExchangers)
app.post('/fake-data-username',addUsernameToUsers)
app.post('/fake-data-blogs',createBlogs)
app.post('/fake-data-referral',createReferrals)
app.post('/fake-data-reviews',createReviewsForExchangers)



app.use(errorHandler);

connectDB(process.env.MONGO_URL);

app.listen(port, (error) => {
  if(error) throw error
  console.log(`Server is running on port ${port}`);
});
