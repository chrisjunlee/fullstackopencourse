import { createContext, useState } from "react";
import { Diagnosis } from "./types";
import { Dispatch, SetStateAction } from "react";



export const DiagnosisContext = 
// null! is non-null assertion. Only way to get this to work with TypeScript
createContext<[Diagnosis[] | undefined, Dispatch<SetStateAction<Diagnosis[] | undefined>>]>(null!);

interface DiagnosisContextProviderProps {
  children: React.ReactNode;
}

export const DiagnosisContextProvider = (props: DiagnosisContextProviderProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | undefined>()

  return (
    <DiagnosisContext.Provider value={[diagnoses, setDiagnoses]}>
      {props.children}
    </DiagnosisContext.Provider>
  )
}