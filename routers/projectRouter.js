const express = require('express');
const router = express.Router();
const projectDB = require("../data/helpers/projectModel.js");

router.get("/", (req, res) => {
  projectDB.get().then(got => {
    res.status(200).json(got)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})
router.post("/", (req, res) => {
  const  {name}  = req.body;
  const  {description}  = req.body;
  projectDB.insert({name, description})
  .then(got => {
    res.status(200).json(got)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})
router.delete("/:id", (req, res) => {
  const  id = req.params.id;
  projectDB.remove(id)
  .then(got => {
    res.status(200).json(got)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})
router.put("/:id", (req, res) => {
  const  id = req.params.id;
  const   name  = req.body.name;
  const  description  = req.body.description;
  // console.log("id", id);
  // console.log("name", name);
  // console.log("descript", description);
  projectDB.update(id, {name, description})
  .then(got => {
    res.status(200).json(got)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

module.exports = router;