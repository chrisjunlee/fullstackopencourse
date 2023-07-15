
import {Patient, NonSensitivePatient, PatientFormValues} from '../types';
import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData as Patient[];

const getAll = (): Patient[]  => { return patients; };

const getPatientsNoSSN = (): NonSensitivePatient[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      entries: []
    };
    return newPatientEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const addPatient = (newPatient: PatientFormValues) => {
  const newPatientObj: Patient = {id: uuid(), ...newPatient};
  patients.push(newPatientObj);
};

export default {
  getPatientsNoSSN, 
  toNewPatientEntry,
  addPatient,
  getAll
};