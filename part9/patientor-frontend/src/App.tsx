import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";
import diagnoseService from "./services/diagnoses";

// Context to share diagnosis state
import { useContext } from "react";
import {DiagnosisContext} from './DiagnoseContext'


const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [diagnosisCodes, setDiagnosisCodes] = useContext(DiagnosisContext);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiagnoses = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnosisCodes(diagnoses);
      console.log('APP diagnosisCodes', diagnosisCodes )
    };
    void fetchDiagnoses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diagnosisCodes?.length]);
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientPage patients={patients}/>} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;