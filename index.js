const express = require("express");
const chalk = require("chalk");
const path = require("path");
const { addNote, getNotes, removeNote, editNote } = require("./notes.controller");

const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express app",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express app",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (req, res) => {
  await removeNote(req.params.id);
  res.render("index", {
    title: "Express app",
    notes: await getNotes(),
    created: false,
  });
});

app.put("/:dataForNewTitle", async (req, res) => {
  const parsed = JSON.parse(req.params.dataForNewTitle)
  await editNote(parsed)
  const notes = await getNotes()
  console.log(notes);
  res.render("index", {
    title: "Express app11111",
    notes: await getNotes(),
    created: false,
  });

});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}`));
});
