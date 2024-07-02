export type Program = {
   id: number;
   program_id: string;
   program_name: string;
   program_code: string;
   program_abbr: string;
};

export type Campus = {
   id: number;
   campus_id: string;
   campus_name: string;
};

export type Session = {
   id: number;
   session_name: string;
};

export type MeetingSubject = {
   campus_lid: string;
   program_lid: string;
   acad_session: string;
   subject_lid: string;
   program_anchor: string[];
   course_anchor: string[];
   attendees: string[];
   is_parent: boolean;
};

export type MasterMeeting = {
   meeting_name: string;
   acad_year: string;
   link_password: string;
   meeting_date: string[];
   meeting_subject: MeetingSubject[];
};

export type SubjectMeetingDetail = {
   status: string;
   meeting_id: number;
   acad_session: string;
   meeting_date: string;
   meeting_name: string;
};

export type MeetingListItem = {
   program_id: number;
   subject_id: number;
   program_name: string;
   subject_name: string;
   subject_meeting_details: SubjectMeetingDetail[];
};

export type MeetingList = {
   meeting_list: MeetingListItem[];
};

export type CampusArrayItem = {
   campus_id: number;
   form_a_id: number | null;
   point_text: string;
};

export type FormAItem = {
   point_id: number;
   point: string;
   sub_point: string;
   campus_array: CampusArrayItem[];
};

export type MeetingDetails = {
   meeting_id: number;
   final_submit: boolean;
   form_a: FormAItem[];
};

export type AnchorAnalytics = {
   user_lid: number;
   profile_url: string;
};

export type ProgramAnalytics = {
   program_lid: number;
   program_name: string;
   meeting_count: number;
   avg_attendance: number;
   ica_percentage: number;
   program_anchor: AnchorAnalytics[];
   course_anchor: AnchorAnalytics[];
};

export type SchoolListAnalytics = {
   school: string;
   campus: string[];
   meeting_count: number;
};

export type subjectListAnalytics = {
   subject_id: number;
   subject_name: string;
   meeting_count: number;
};

export type AwsData = {
    ETag: string,
    ServerSideEncryption?: string; 
    Location: string,       
    key: string,
    Key: string,
    Bucket: string
}