export type journalArticleDetails = {
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
    supporting_documents: string[];
 };


 export type BookPublicationDetails = {
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
   appln_no: number;
   publication_date: string;
   patent_stage: number;
   invention_type: number[];
   faculty_id: number[];
   sdg_goals: number[];
   supporting_documents: string[];
 }

 export type researchProjectDetails = {
   title: string;
   grant_proposal: number;
   grant_type: number;
   thrust_area: string;
   grant_date: string;
   funding_agency: string;
   duration: string;
   scheme: string;
   payment_date: string;
   received_amount: number;
   research_status: number;
   faculty_id: number[];
   supporting_documents: string[];
   nmims_school: string[];
   nmims_campus: string[];

 }