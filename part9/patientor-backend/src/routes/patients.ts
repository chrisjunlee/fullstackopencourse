import express from "express";
import patientService from "../services/patientsService";
import { PatientFormValues } from "../types";

const router = express.Router();

router.post('/', (req, res) => {
  const newPatientEntry: PatientFormValues = patientService.toNewPatientEntry(req.body);
  const newPatientObj = patientService.addPatient(newPatientEntry);
  res.send(newPatientObj);
});

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsNoSSN());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getAll().find(p => p.id === id);

  if(!patient) {
    res.status(404).send("Error: Patient not found");
  } 
  
  res.send(patient);
});

export default router;