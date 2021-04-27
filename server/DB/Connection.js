const mongoose = require('mongoose');

dbConnect = () =>
  mongoose.connect(
    'mongodb+srv://SLOKAcmnt:cmnt@cluster0.06osd.mongodb.net/SLOKAcmnt?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    () => console.log('Connected to DataBase')
  );

module.exports = { dbConnect };
