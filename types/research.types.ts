import { string } from 'zod';
import { SupportingDocument, MultiFieldDocument } from 'types/research.master';

export type journalArticleDetails = {
   journal_paper_id?: number;
   journal_name: string;
   title: string;
   publish_year: number;
   total_authors: number;
   nmims_author_count: number;
   uid: string;
   doi_no: string;
   publisher: string;
   publishing_date: string;
   issn_no: string;
   scopus_site_score: number;
   gs_indexed: number;
   journal_type: number;
   ugc_indexed: string;
   scs_indexed: string;
   foreign_authors_count: number;
   student_authors_count: number;
   impact_factor: number;
   chapter_page_no: number;
   paper_type: number;
   nmims_school: string[];
   nmims_campus: string[];
   abdc_indexed: number;
   policy_cadre: number[];
   all_authors: number[];
   nmims_authors: number[];
   foreign_authors: number[];
   other_authors: number[];
   student_authors: number[];
   supporting_documents?: SupportingDocument;
};

export type BookPublicationDetails = {
   book_publication_id?: number;
   title: string;
   edition: string;
   publish_year: number;
   volume_no: string;
   publisher: string;
   web_link: string;
   doi_no: string;
   publication_place: string;
   isbn_no: string;
   nmims_authors_count: number;
   publisher_category: number;
   nmims_school: string[];
   nmims_campus: string[];
   all_authors: number[];
   nmims_authors: number[];
   supporting_documents?: SupportingDocument;
};

export type UpdatedBookPublicationDetails = {
   book_publication_id: number;
   title: string;
   edition: string;
   publish_year: number;
   volume_no: string;
   publisher: string;
   web_link: string;
   doi_no: string;
   publication_place: string;
   isbn_no: string;
   nmims_authors_count: number;
   publisher_category: number;
   nmims_school: string[];
   nmims_campus: string[];
   all_authors: number[];
   nmims_authors: number[];
   supporting_documents?: SupportingDocument;
};

export type EditedBookPublicationDetails = {
   edited_publication_id?: number,
   edition: string;
   title: string;
   publish_year: number;
   volume_no: number;
   publisher: string;
   web_link: string;
   doi_no: string;
   publication_place: string;
   isbn_no: string;
   nmims_authors_count: number;
   publisher_category: number;
   nmims_school: string[];
   nmims_campus: string[];
   all_authors: number[];
   nmims_authors: number[];
   book_editors: number[];
   supporting_documents?: SupportingDocument;
 

 }
export type bookChapterDetails = {
   book_chapter_id?: number;
   edition: string;
   book_title: string;
   chapter_title: string;
   publish_year: number;
   volume_no: string;
   page_no: string;
   publisher: string;
   web_link: string;
   doi_no: string;
   publication_place: string;
   isbn_no: string;
   nmims_authors_count: number;
   publisher_category: number;
   all_authors: number[];
   nmims_authors: number[];
   book_editors: number[];
   nmims_school: string[];
   nmims_campus: string[];
   supporting_documents?: SupportingDocument;
};

export type conferenceDetails = {
   internal_authors: any;
   external_authors: any;
   conference_id?: number;
   paper_title: string;
   conference_name: string;
   place: string;
   presenting_author: string;
   proceeding_published: string;
   conference_type: number;
   issn_no: string;
   publication_date: string;
   sponsored: number;
   doi_no: string;
   publication_place: string;
   amount: number;
   nmims_authors_count: number;
   volume_no: string;
   organizing_body: string;
   all_authors: number[];
   faculty_id: number[];
   nmims_school: string[];
   nmims_campus: string[];
   conference_documents: SupportingDocument;
};

export type patentDetails = {
   internal_authors: any;
   external_authors: any;
   patent_id?: number;
   title: string;
   appln_no: number;
   publication_date: number;
   patent_stage: number;
   invention_type: number[];
   faculty_id: number[];
   sdg_goals: number[];
   supporting_documents?: SupportingDocument;
};

export type researchProjectDetails = {
   research_project_id?: number;
   internal_authors: any;
   external_authors: any;
   title: string;
   grant_proposal: number;
   grant_type: number;
   thrust_area: string;
   grant_date: string;
   funding_amount: number;
   funding_agency: number;
   duration: string;
   scheme: number;
   payment_date: string;
   received_amount: number;
   research_status: number;
   faculty_id: number[];
   supporting_documents?: SupportingDocument;
   nmims_school: string[];
   nmims_campus: string[];
};

export type IPRDetails = {
   ipr_id?: number;
   internal_authors: any;
   external_authors: any;
   title: string;
   appln_no: number;
   filed_date: string;
   grant_date: string;
   published_date: string;
   publication_no: number;
   granted_no: number;
   institue_affiliation: string;
   patent_status: number;
   invention_type: number[];
   sdg_goals: number[];
   applicant_names: number[];
   nmims_school: string[];
   nmims_campus: string[];
   faculty_id: number[];
   supporting_documents?: SupportingDocument;
}; 



export type EContent = {
   eContentId ?: number;
   faculty_name: string;
   module: string;
   module_platform: string;
   launching_date: string;
   document_link: string;
   media_link: string;
   facility_list: string;
};

export type researchAwardDetails = {
   research_award_id ?: number;
   award_name: string;
   award_details: string;
   award_date: string;
   award_organization: string;
   award_place: string;
   award_category: number;
   faculty_name: string;
   supporting_documents: SupportingDocument;

};

export type seminarDetails = {
   research_seminar_id ?: number;
   topic: string;
   resource_person: string;
   paper_title: string;
   journal_name: string;
   publisher: string;
   publisher_category: number;
   publication_date: string;
   research_date: string;
   uid: string;
   doi_no: string;
   volume_no: string;
   issn_no: string;
   scopus_site_score: string;
   gs_indexed: string;
   ugc_indexed: string;
   scs_indexed: string;
   wos_indexed: string;
   impact_factor: string;
   nmims_school: string[];
   nmims_campus: string[];
   supporting_documents ?: SupportingDocument;
   abdc_indexed: number;
   nmims_authors: number[];
};

export type caseStudyDetails = {
   case_study_id ?: number,
   title: string;
   edition: string;
   publish_year: number;
   publisher: string;
   publisher_category: number;
   volume_no: string;
   page_no: string;
   url: string;
   nmims_authors_count: number;
   nmims_school: string[];
   nmims_campus: string[];
   all_authors: number[];
   nmims_authors: number[];
   supporting_documents ?: SupportingDocument ;
}

// export type teachingDetails = {
//    pedagogy_innovation: string;
//    pedagogy_link: string;
//    fdp_program: string;
//    fdp_link: string;
//    student_workshops: string;
//    workshop_link: string;
//    niche: string;
//    niche_link: string;
//    program_orientation: string;
//    orientation_link: string;
//    pedagogy_innovation_documents: string[];
//    fdp_program_documents: string[];
//    students_workshops_documents: string[];
//    niche_documents: string[];
//    program_orientation_documents: string[];
// };

// export type meetingDetails = {
//    ranking: string;
//    ranking_link: string;
//    accreditation: string;
//    accreditation_link: string;
//    achievements: string;
//    achievements_link: string;
//    convocation: string;
//    convocation_link: string;
//    inaugral_program: string;
//    inaugral_program_link: string;
//    events: string;
//    events_link: string;
//    ranking_documents: string[];
//    accreditation_documents: string[];
//    achievements_documents: string[];
//    convocation_documents: string[];
//    inaugural_documents: string[];
//    events_documents: string[];
// }

// export type brandingDetails = {
//    faculty_recognition: string;
//    faculty_recognition_link: string;
//    faculty_awards: string;
//    faculty_awards_link: string;
//    staff_awards: string;
//    staff_awards_link: string;
//    alumni_awards: string;
//    alumni_awards_link: string;
//    student_awards: string;
//    student_awards_link: string;
//    international_ventures: string;
//    international_ventures_link: string;
//    conference_participation: string;
//    conference_participation_link: string;
//    organizing_conference: string;
//    organizing_conference_link: string;
//    student_event: string;
//    student_event_link: string;
//    newspaper_article: string;
//    newspaper_article_link: string;
//    faculty_recognition_documents: string[];
//    faculty_awards_documents: string[];
//    staff_awards_documents: string[];
//    student_awards_documents: string[];
//    alumni_awards_documents: string[];
//    international_ventures_documents: string[];
//    conference_participation_documents: string[];
//    organizing_conference_documents: string[];
//    student_event_documents: string[];
//    newspaper_article_documents: string[];

// }

export type TeachingExcellance = {
   teaching_id?: number;
   pedagogy_innovation: string | null;
   pedagogy_link: string | null;
   fdp_program: string | null;
   fdp_link: string | null;
   student_workshops: string | null;
   workshop_link: string | null;
   niche: string | null;
   niche_link: string | null;
   program_orientation: string | null;
   program_orientation_link: string | null;
   documents: SupportingDocument;
};

export type MeetingStakeholders = {
   meeting_id?: number;
   ranking: string | null;
   ranking_link: string | null;
   accreditation: string | null;
   accreditation_link: string | null;
   achievements: string | null;
   achievements_link: string | null;
   convocation: string | null;
   convocation_link: string | null;
   inaugral_program: string | null;
   inaugral_program_link: string | null;
   events: string | null;
   events_link: string | null;
   documents: SupportingDocument;
};

export type BrandingAdvertisement = {
   branding_id ?: number ;
   faculty_recognition : string | null;
   faculty_recognition_link : string | null;
   faculty_awards : string | null;
   faculty_awards_link : string | null;
   staff_awards : string | null;
   staff_awards_link : string | null;
   alumni_awards :string | null;
   alumni_awards_link : string | null;
   student_awards : string | null;
   student_awards_link : string | null;
   international_ventures : string | null;
   international_ventures_link : string | null;
   conference_participation : string | null;
   conference_participation_link : string | null;
   organizing_conference : string | null;
   organizing_conference_link : string| null;
   student_event : string | null;
   student_event_link : string | null;
   newspaper_article : string  | null ;
   newspaper_article_link : string | null;
   documents : SupportingDocument;
}

export type facultyDetails = {
   first_name : string;
   last_name : string,
   username : string,
   institute : string,
   address : string,
   designation : string,
   faculty_type : number;
   faculty_id : number;
}

export type facultyUpdateDetails = {
   faculty_id : number;
   faculty_name : string,
   institute : string,
   address : string,
   designation : string,
   faculty_type : number;
}

export type loginDetails = {
   username : string,
   password : string
}


export type masterDataDetails = {
   master_id : number;
   first_name : string,
   last_name : string,
   username : string,
   input_data_type : number;
} 

export type updMasterDetails = {
   [x: string]: any;
   master_id ?: number;
   faculty_lid : number;
   master_input_name : string;
   master_type: number;

}

export type ApprovalDetails = {
   form_lid: number,
   form_status: number,
   level: number,
   form_status_id: number,
   remarks : string
}
