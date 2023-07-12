
import express from 'express';
import cors from 'cors';
import patients from './data/patients'
import diagnoses from './data/diagnoses'
import {Diagnosis, Gender, Patient, PatientNoSSN, PatientFormValues} from './types'
import { v1 as uuid } from 'uuid'

const app = express();
app.use(express.json());

// to allow our frontend to access endpoints
app.use(cors());

const PORT = 3001;

const getPatientsNoSSN = (): PatientNoSSN[] => {
  return patients.map( ({ssn, ...rest}) => ({...rest}));
};

const toNewPatientEntry = (object: unknown): PatientFormValues => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  console.log('toNewPatientEntry', object);

  if ('name' in object && 'occupation' in object && 'gender' in object && 'ssn' in object && 'dateOfBirth' in object) {
    const newPatientEntry: PatientFormValues = {
      name: object.name as string,
      occupation: object.occupation as string,
      gender: object.gender as string,
      ssn: object.ssn as string, 
      dateOfBirth: object.dateOfBirth as string, 
    };
    return newPatientEntry
  }

  throw new Error('Incorrect data: some fields are missing');
};

app.post('/api/patients', (req, res) => {
  const newPatientEntry = toNewPatientEntry(req.body)
  const newPatientObj = {id: uuid(), ...newPatientEntry}
  console.log('newPatientObj', newPatientObj)
  
  patients = patients.concat(newPatientObj)
  res.send(newPatientObj)

})

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/patients', (_req, res) => {
  res.send(getPatientsNoSSN());
});

app.get('/api/diagnoses', (_req, res) => {
  res.send(diagnoses);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});