const express = require('express');
const router = express.Router();
const actionDB = require("../data/helpers/actionModel.js");
const projectDB = require("../data/helpers/projectModel.js");

router.get("/", (req, res) => {
  actionDB.get().then(got => {
    res.status(200).json(got)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})
router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("pr_id", id);
  projectDB.getProjectActions(id)
  .then(got => {
    res.status(200).json(got)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})
router.post("/:id", checkProjectId, (req, res) => {
  const project_id = req.params.id;
  const  description = req.body.description;
  const  notes  = req.body.notes;
  console.log("pr_id",project_id);
  console.log("description", description);
  console.log("notes", notes);
  actionDB.insert({project_id, description, notes})
  .then(got => {
    res.status(200).json(got)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})
router.delete("/:id", (req, res) => {
  const  id = req.params.id;
  console.log("id", id);
  actionDB.remove(id)
  .then(got => {
    res.status(200).json(got)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})
router.put("/:id", (req, res) => {
  const  id = req.params.id;
  const   notes  = req.body.notes;
  const  description  = req.body.description;
  actionDB.update(id, {description, notes})
  .then(got => {
    res.status(200).json(got)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

function checkProjectId(req, res, next) {
  projectDB.get(req.params.id)
  .then(got => {
    if(got){
      next();
    } else {
      res.status(404).json("no post with that id exists");
    }
  })
}
module.exports = router;