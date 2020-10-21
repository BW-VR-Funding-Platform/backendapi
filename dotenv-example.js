console.log('testing for api:', process.env.API);

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

console.log('Now the value for API is:', process.env.API);