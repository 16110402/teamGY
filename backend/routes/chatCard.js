const express = require("express");
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const MainTopic = require("../models/MainTopic");
const Thread = require("../models/Thread");
const fetchuser = require('../middleware/fetchuser');

// ROUTE 2:-Add a new notes using: POST "api/addcontent".
// router.post(
//     "/addcontent",
//     [
//       body("title", "Enter a valid title").isLength({ min: 3 }),
//       body("description", "description must be atleast 5 characters").isLength({
//         min: 5
//       }),
//     ],
//     async (req, res) => {
//       try {
//         const { title, description, tag } = req.body;
//         // if there are any error then send error
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//           return res.status(400).json({ errors: errors.array() });
//         }
//         const chatCard = new Main({
//           title,
//           description,
//           tag,
//           // user: req.user.id,
//         });
//         const savedContent = await chatCard.save();
//         res.json(savedContent);
//       } catch (error) {
//         console.error(error.message);
//         res.status(500).send("internal server Error occured");
//       }
//     }
//   );

  // ROUTE1:-Get all the topic using: GET "api/MainTopic".
  router.get("/fetchalltopic",  async (req, res) => {
  
    try {
      const topic = await MainTopic.find({});
      // console.table(topic)
      res.json(topic);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server Error occured");
    }
  });

// ROUTE 2:-Add a new notes using: POST "api/addtitle".
router.post(
    "/addtitle",
    [
      body("title", "Enter a valid title").isLength({ min: 3 }),
      body("description", "description must be atleast 5 characters").isLength({
        min: 5
      }),
    ],
    async (req, res) => {
      try {
        const { title, description } = req.body;
        // if there are any error then send error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const  maintopic= new MainTopic({
          title,
          description,
        });
        const savedContent = await maintopic.save();
        res.json(savedContent);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server Error occured");
      }
    }
  );

// ROUTE 2:-Add a new thread using: POST "api/threads".
router.post(
    "/addthreads", fetchuser,
    [
      body("comment", "Enter a valid comment").isLength({ min: 5 }),
    ],
    async (req, res) => {
      try {
        const { comment, date} = req.body;
        // console.log("user id",req.user.id)
        // if there are any error then send error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const  thread= new Thread({
          comment,
          date,
          user: req.user.id
        });
        const savedContent = await thread.save();
        res.json(savedContent);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server Error occured");
      }
    }
  );

  // ROUTE1:-Get all the thread using: GET "api/fetchallthread".
  router.get("/fetchallthread", fetchuser, async (req, res) => {
  
    try {
      // const i = req.user.id;
      // console.log(i);
      const dt = await User.find({_id: req.user.id});
      var x, y;
      dt.map((item, i) => (
        x = item.name,
        y = item.date
      ))
      obj = {
        name: x,
        date: y
      };
      const thread = await Thread.find({user: req.user.id});
      // console.table(topic)
      console.log(obj);
      res.json({thread,obj});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server Error occured");
    }
  });

  module.exports = router
  