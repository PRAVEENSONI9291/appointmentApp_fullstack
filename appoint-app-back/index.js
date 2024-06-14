const express= require('express');
const bodyParser= require('body-parser');
const cors= require('cors');



const sequelize= require('./database');
const controller= require('./controllers');



const app= express();
app.use(bodyParser.json());
app.use(cors());

app.get('/appointments', controller.getAppointments );
  
  app.post('/appointments', controller.postAppointments);
  
  app.delete('/appointments/:id', controller.deleteAppointments);
  
  app.put('/appointments/:id', controller.putAppointments);




sequelize.sync().then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  });

