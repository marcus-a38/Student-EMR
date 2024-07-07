export const Patient = (patient) => {
  this.first = patient.first;
  this.last = patient.last;
  this.mrn = patient.mrn;
  this.dob = patient.dob;
  this.gender = patient.gender;
  this.religion = patient.religion;
  this.records = patient.records;
}

export const User = (user) => {
  this.id = user.id;
  this.email = user.email;
  this.utype = user.utype;
}