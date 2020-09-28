const express = require("express");
const router = express.Router();
const helper = require("../helper");
const Post = require("../models/post");

router.get("", (req, res, next) => {
  Post.find({})
    .then((post) => {
      res.status(200).json(helper.construcResponse(200, post, "Blog posts fetched"));
    })
    .catch((err) => {
      res.status(400).json(helper.construcResponse(400, err));
    });
});

router.get("/:link", (req, res, next) => {
  Post.find({ link: req.params.link })
    .then((post) => {
      if (post) {
        res.status(200).json(helper.construcResponse(200, post, "Blog post fetched"));
      } else {
        res.status(404).json(helper.construcResponse(404, null, "Blog post not found"));
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(404).json(helper.construcResponse(400, null, "Invalid id"));
      } else {
        res.status(400).json(helper.construcResponse(400, err));
      }
    });
});

router.post("", (req, res, next) => {
  const post = new Post({
    ...req.body,
  });
  post
    .save()
    .then((post) => {
      res.status(200).json(helper.construcResponse(200, post, "Blog post added"));
    })
    .catch((err) => {
      res.status(400).json(helper.construcResponse(400, err));
    });
});

router.put("/:id", (req, res, next) => {
  const fields = ["title", "body", "img"];
  let body = { ...req.body, updatedAt: new Date().toISOString() };
  Post.findOneAndUpdate(req.params.id, body)
    .then((post) => {
      fields.forEach((key) => (post[key] = post[key] ? body[key] : null));
      res.status(200).json(helper.construcResponse(200, post, "Blog post updated"));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(404).json(helper.construcResponse(400, null, "Invalid id"));
      } else {
        res.status(400).json(helper.construcResponse(400, err));
      }
    });
});

router.delete("/:id", (req, res, next) => {
  // res.status(200).json({});
  Post.findByIdAndDelete(req.params.id)
    .then((data) =>
      res.status(200).json(helper.construcResponse(200, null, `Blog post deleted ${req.params.id}`))
    )
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(404).json(helper.construcResponse(400, null, "Invalid id"));
      } else {
        res.status(400).json(helper.construcResponse(400, err));
      }
    });
});

module.exports = router;
