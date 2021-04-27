const USER = require('../DB/User');

exports.ViewComments = async (req, res) => {
  const users = await USER.find({});
  res.send({ users });
};

exports.AddComment = async (req, res) => {
  const user = new USER({
    Name: req.body.Name,
    Comment: req.body.Comment,
    Reply: req.body.Reply,
  });
  try {
    await user.save();
    res.send({ Comment: user });
    return;
  } catch (err) {
    res.send({ error: err });
  }
};

exports.SearchComment = async (req, res) => {
  const regEx = req.body.SearchComment;
  const reg = new RegExp(regEx, 'i');
  let searched = [];
  const comments = await USER.find({});
  for (const comm of comments) {
    if (comm.Comment.match(reg) != null) {
      searched.push(comm);
    }
  }
  res.send({ searched });
};
