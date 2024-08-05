import {
    insertAdminProgram,
    insertCampusMaster,
    insertOrganizationMaster,
    insertPermanentFacultyMaster,
    insertProgramMaster,
    insertSessionMaster,
    insertSpecialUser,
    insertStudentEventMaster,
    insertSubjectMaster,
    insertVisitingFacultyMaster,
} from '$model/sap-master'

export const tables = {
   ORGANIZATION: 'organization',
   CAMPUS: 'campus',
   EVENT_MASTER: "sap_event_master", // not found
   // IMAGE: "image",
   PERMANENT_FACULTY: 'permanent_faculty',
   // PROGRAM_MASTER: 'sap_programs',
   // SESSION_MASTER: 'session_master',
   // SAP_NUMBER_CHANGE: "sap_number_change",
   // STUDENT_ATTENDANCE: "student_attendance",
   STUDENT_EVENT: 'sap_student_event',
   // STUDENT_MASTER: "student_master",
   // STUDENT_MASTER_TCS: "student_master_tcs",
   // STUDENT_REG_TCS: "student_reg_tcs",
   // STUDENT_ROLL_NO: "student_roll_no",
   // SUBJECT: 'subject',
   // SUBJECT_ENROLL: "subject_enroll",
   VISITING_FACULTY: 'visiting_faculty',
   // DAILY_ATTENDENCE_SLOT :"daily_attendence_slot",
   // ADMIN_PROGRAM: 'admin_program',
   // SPECIAL_USER: 'special_user',
};

// export const insertSapDataFunctions = {};
export const insertSapDataFunctions = {
    organization: insertOrganizationMaster,
    campus: insertCampusMaster,
//     sap_programs: insertProgramMaster,
//     session_master: insertSessionMaster,
//     subject: insertSubjectMaster,
    permanent_faculty: insertPermanentFacultyMaster,
    visiting_faculty: insertVisitingFacultyMaster,
    sap_student_event: insertStudentEventMaster,
    sap_event_master: insertStudentEventMaster,
//     admin_program: insertAdminProgram,
   //  special_user: insertSpecialUser,
}
