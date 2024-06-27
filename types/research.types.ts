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

 export type IPRDetails = {
    ipr_id: number;
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
    inventors_id: number[];
    supporting_documents: string[];
 }

 
 