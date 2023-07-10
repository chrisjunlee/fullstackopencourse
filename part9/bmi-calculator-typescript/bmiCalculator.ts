const calculateBmi = (height: number, mass: number): string => {
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

console.log('process.argv', process.argv)
const height = Number(process.argv[2])
const mass = Number(process.argv[3])

console.log(calculateBmi(height, mass))