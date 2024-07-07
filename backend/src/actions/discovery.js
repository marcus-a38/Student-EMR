async function searchByNumber(mrn) {
  api.appGet({
    action: 'search_by_mrn',
    patient_mrn: mrn
  }).then((res) => {
    if (res.success) {

    }
  });
}
  
async function searchByDetails(patientDetails) {
  api.appGet({
    action: 'search_by_details',
    ...patientDetails
  }).then((res) => {

  });
}

async function getPatientRecords(mrn) {
  api.appPost({
    action: 'view',
    patient_mrn: mrn
  }).then((res) => {

  });
}

  
