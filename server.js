const express = require("express"),
      app = express()

app.use(express.static(__dirname + "/src"))
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/src/index.html")
})

app.listen(3000);