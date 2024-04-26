const express = require("express");
const authRoute = require("./auth.route");
const router = express.Router();
const userRoute = require("./user.route");
const workspaceRoute = require("./workspace.route");
const boardRoute = require("./board.route");
const listRoute = require("./list.route");
const cardRoute = require("./card.route");
const checklistRoute = require("./checklist.route");
const labelRoute = require("./label.route");
const commentRoute = require("./comment.route");
const blogRoute = require("./blog.route");

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/w",
    route: workspaceRoute,
  },
  {
    path: "/b",
    route: boardRoute,
  },
  {
    path: "/list",
    route: listRoute,
  },
  {
    path: "/card",
    route: cardRoute,
  },
  {
    path: "/checklist",
    route: checklistRoute,
  },
  {
    path: "/label",
    route: labelRoute,
  },
  {
    path: "/comment",
    route: commentRoute,
  },
  {
    path: "/blog",
    route: blogRoute
  }
];

// const devRoutes = [
//   {
//     path: "/docs",
//     route: docsRoute
//   }
// ]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
