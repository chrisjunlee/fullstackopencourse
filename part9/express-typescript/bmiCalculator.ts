export const calculateBmi = (height: number, mass: number): string => {
  height = height/100

  let bmi = mass/(height*height)
  console.log('bmi', bmi)
  let retVal = ""

  if(bmi < 18.5) {
    retVal = "Underweight"
  }
  else if( bmi >= 18.5 && bmi <= 24.9) {
    retVal = "Normal"
  }
  else {
    retVal = "Overweight"
  }

  return retVal
}