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
 
 