const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
  origin: 'http:localhost/3000'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

const db = require("./app/models");

console.log(db.sequelize);

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});



app.get('/', (req, res) => {
res.json({message: "Bienvenido al API de MemGen"});
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`);
});

