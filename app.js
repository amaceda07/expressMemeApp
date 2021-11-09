const express = require('express');
const cors = require('cors');
const jwt_conf = require("./config/auth.config");
const app = express();


var corsOptions = {
  origin: 'http:localhost/3000'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

const db = require("./app/models");



// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });



app.get('/', (req, res) => {
  res.json({ message: "Bienvenido al API de MemGen" });
});

require("./app/routes/meme.routes")(app);
require("./app/routes/user.routes")(app);


app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`);
});

