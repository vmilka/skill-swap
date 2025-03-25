const createError = require("http-errors");
const Skill = require("../models/skill.model");

module.exports.list = (req, res, next) => {
  Skill.find({ 'user': { $ne: req.user.id } })
    .populate('user')
    .then((skills) => {
      const response = Array.from(
        new Map(skills.map(sk => [sk.user.id, {
          id: sk.user.id,
          name: sk.user.name,
          location: sk.user.city
        }])).values()
      ).slice(0, 9);

      response.forEach(element => { element.skills = skills.filter(sk => sk.user.name === element.name).map(sk => sk.name) });
      res.json(response)
    })
    .catch((error) => next(error));
};


module.exports.detail = (req, res, next) => {
  console.log(req.params)
  const user = req.params.id;

  Skill.find({ user: user })
    .populate('user')
    .then((skills) => {

      const response = Array.from(
        new Map(skills.map(sk => [sk.user.id, {
          id: sk.user.id,
          name: sk.user.name,
          location: sk.user.city
        }])).values()
      ).slice(0, 1);

      response.forEach(element => { element.skills = skills.filter(sk => sk.user.name === element.name).map(sk => sk.name) });

      res.json(response[0])
    })
    .catch((error) => next(error));
};


module.exports.create = (req, res, next) => {

  const skill = req.body;
  skill.user = req.user

  Skill.create(skill)
    .then((skill) => res.status(201).json(skill))
    .catch((error) => next(error));
};


module.exports.delete = (req, res, next) => {

  const { name } = req.params;
  console.log(name)
  console.log(req.user.id)

  Skill.find({ user: req.user, name: name })
    .then((skill) => {

      if (!skill) next(createError(404, "Skill not found"));
      else {
        Skill.deleteMany({ user: req.user, name: name })
          .then((skill) => {
            if (!skill) next(createError(404, "Skill not found"));
            else res.status(204).send();
          })
          .catch((error) => next(error));
      }
    })
    .catch((error) => next(error));

};


module.exports.update = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  const permittedParams = ["description", "years_experience", "certifications"];
  Object.keys(body).forEach((key) => {
    if (!permittedParams.includes(key)) delete body[key];
  });

  Skill.findById(id)
    .then((skill) => {

      if (skill.user.toString() !== req.user.id.toString()) next(createError(404, "Skill not found for your user"));
      else {
        if (!skill) next(createError(404, "Skill not found"));
        else {

          Skill.findByIdAndUpdate(id, body, { runValidators: true, new: true })
            .then((skill) => {
              if (!skill) next(createError(404, "Skill not found"));
              else res.status(201).json(skill);
            })
            .catch((error) => next(error))
        }
      }
    })
    .catch((error) => next(error));
};

