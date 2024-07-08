import { string } from "zod";
import {SupportingDocument , MultiFieldDocument} from "types/research.master"

export type journalArticleDetails = {
    journal_paper_id ?: number;
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
    gs_indexed:number;
    journal_type: number;
    ugc_indexed: string;
    scs_indexed: string;
    foreign_authors_count: number;
    student_authors_count: number;
    impact_factor: number;
    page_no: number;
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
    supporting_documents ?: SupportingDocument ;
 };

 export type BookPublicationDetails = {
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
    supporting_documents: number[];

 } 


 export type EditedBookPublicationDetails = {
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
    supporting_documents: string[];
 

 }
 

 export type bookChapterDetails = {
    edition: string;
    book_title: string;
    chapter_title: string;
    publish_year: number;
    volume_no: string;
    page_no: string;
    publisher: string;
    web_link : string;
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
    supporting_documents: string[];

 }

 export type conferenceDetails = {
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
   conference_documents: string[];
   award_documents: string[];
 }

 export type patentDetails = {
   title: string;
   appln_no: number
   filed_date:string;
   grant_date:string;  
   published_date: string;
   publication_no: number;
   granted_no: number;
   institue_affiliation: string;
   patent_status: number;
   invention_type : number[];
   sdg_goals : number[];
   applicant_names :number[];
   nmims_school : string[];
   nmims_campus:string[];  
   inventors_id: number[];
   supporting_documents:string[];
}

export type IPRDetails = {
   
   ipr_id:number;
   title: string;
   appln_no: number
   filed_date:string;
   grant_date:string;  
   published_date: string;
   publication_no: number;
   granted_no: number;
   institue_affiliation: string;
   patent_status: number;
   invention_type : number[];
   sdg_goals : number[];
   applicant_names :number[];
   nmims_school : string[];
   nmims_campus:string[];  
   inventors_id: number[];
   supporting_documents:string[];
}

export type EContent = {
   eContentId: number;
   faculty_name: string;
   module: string;
   module_platform: string;
   launching_date: string;
   document_link: string;
   media_link: string;
   facility_list: string;
}

export type TeachingExcellance = {
   teaching_id ?:  number;
   pedagogy_innovation : string | null;
   pedagogy_link: string | null;
   fdp_program: string | null;
   fdp_link: string | null;
   student_workshops: string | null;
   workshop_link: string | null;
   niche: string | null;
   niche_link: string | null;
   program_orientation : string | null;
   program_orientation_link: string | null;
   documents : SupportingDocument;
}

export type MeetingStakeholders = {
   meeting_id ?: number ;
   ranking : string | null;
   ranking_link : string | null;
   accreditation : string | null;
   accreditation_link : string | null;
   achievements : string | null;
   achievements_link : string | null;
   convocation :string | null;
   convocation_link : string | null;
   inaugral_program : string | null;
   inaugral_program_link : string | null;
   events : string | null;
   events_link : string | null;
   documents : SupportingDocument;
}

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