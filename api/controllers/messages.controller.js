const createError = require("http-errors");
const Message = require("../models/message.model");

module.exports.list = (req, res, next) => {

  Message.find({ sender: req.user.id })
    .populate('receiver')
    .then((message1) => {

      Message.find({ receiver: req.user.id })
        .populate('sender')
        .then((message) => {

          const receiver = [...new Map(
            message1.map(ms => [ms.receiver.email, { name: ms.receiver.name, email: ms.receiver.email, id: ms.receiver?.id }])
          ).values()];

          const sender = [...new Map(
            message.map(ms => [ms.sender.email, { name: ms.sender.name, email: ms.sender.email, id: ms.sender?.id }])
          ).values()];

          const mergedList = [...new Map(
            [...receiver, ...sender].map(user => [user.email, user])
          ).values()];


          res.json(mergedList)
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
};

module.exports.detailChat = (req, res, next) => {
  const receiver = req.params.receiver;

  Message.find({ receiver: receiver, sender: req.user.id  })
    .then((menssages1) => {

      Message.find({ receiver: req.user.id, sender: receiver})
        .then((menssages) => {

          const response = menssages1.map(ms => ({
            sender: 'yo',//ms.sender,
            text: ms.content,
            createdAt: ms.createdAt
          }))

          const response2 = menssages.map(ms => ({
            sender: ms.sender,
            text: ms.content,
            createdAt: ms.createdAt
          }))

          const mergedList = [...response, ...response2];

          const sortedList = mergedList.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          res.json(sortedList)
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
};


module.exports.create = (req, res, next) => {

  const message = req.body;
  message.sender = req.user

  console.log(message)

  Message.create(message)
    .then((message) => {

      delete message.sender.avatar

      res.status(201).json(message)
    })
    .catch((error) => next(error));
};

