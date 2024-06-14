const Appointment= require('./models/appointment');

exports.getAppointments= async (req, res) => {
    try {
      const appointments = await Appointment.findAll();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  exports.postAppointments= async (req, res) => {
    try {
      const appointment = await Appointment.create(req.body);
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.deleteAppointments= async (req, res) => {
    try {
      const id = req.params.id;
      await Appointment.destroy({ where: { id } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.putAppointments= async (req, res) => {
    try {
      const id = req.params.id;
      await Appointment.update(req.body, { where: { id } });
      const updatedAppointment = await Appointment.findByPk(id);
      res.json(updatedAppointment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //new