const { Router } = require("express");

const { check } = require("express-validator");
const {
  createTask,
  deleteTask,
  editTask,
  getTask,
  getTasks,
} = require("../controllers/task");
const { validateErrors } = require("../middlewares/validateErrors");
const { validateJWT } = require("../middlewares/validateJWT");
const router = Router();

/* host/api/task */
router.use(validateJWT);
router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    validateErrors,
  ],
  createTask
);

router.delete("/:id", deleteTask);

router.put(
  "/:id",
  [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    validateErrors,
  ],
  editTask
);

router.get("/:id", getTask);
router.get("/", getTasks);

module.exports = router;
