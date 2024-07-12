export type SupportingDocument = {
    path: string;
    filename: string | undefined;
    input_abbr ?: string;
}[];

export type MultiFieldDocument = {
    path: string;
    filename: string | undefined;
    input_abbr : string;
}[];

export type UpdateViewType = {
    id: number,
    type: any, 
    description: string, 
    link: string 
    file : File[] | []
}[];

export type Module = {
    id: number;
    type: any | null;
    description: any;
    link: any;
    file ?: File[];
    isPresent ?: boolean;
  } | null;
  
  export type DropdownValue = {
    value: string;
    label: string;
  };
  
  export type File = {
    // Define the structure of File if needed
  };
  
  export type TeachingExcellanceDb = {
    id: number;
    pedagogy_innovation: string | null;
    pedagogy_link: string | null;
    fdp_program: string | null;
    fdp_link: string | null;
    student_workshops: string | null;
    workshop_link: string | null;
    niche: string | null;
    niche_link: string | null;
    program_orientation: string | null;
    orientation_link: string | null;
    pi : string | null;
    ap : string | null;
    ws : string | null;
    nw : string | null;
    po : string | null;
  };
  
  export type TeachingExcellanceInput = {
    input: string;
    abbr: string;
  };
  

  export type MeetingStakeholderDb = {
    id: number;
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
    rn : string | null;
    sc : string | null;
    ac : string | null;
    cn : string | null;
    ip : string | null;
    en : string | null;

  };
  
  export type MeetingStakeholderInput = {
    input: string;
    abbr: string;
  };

  export type BrandingAdvertisementDb = {
    id: number;
    faculty_recognition: string | null;
    faculty_recognition_link: string | null;
    faculty_awards: string | null;
    faculty_awards_link: string | null;
    staff_awards: string | null;
    staff_awards_link: string | null;
    alumni_awards: string | null;
    alumni_awards_link: string | null;
    student_awards: string | null;
    student_awards_link: string | null;
    international_ventures: string | null;
    international_ventures_link: string | null;
    conference_participation: string | null;
    conference_participation_link: string | null;
    organizing_conference: string | null;
    organizing_conference_link: string | null;
    student_event: string | null;
    student_event_link: string | null;
    newspaper_article: string | null;
    newspaper_article_link: string | null;
    fr : string | null;
    fa : string | null;
    sa : string | null;
    aa : string | null;
    ilv : string | null;
    cp : string | null;
    ocan : string | null;
    sep : string | null;
    na : string | null;
    saa : string | null;



  };
  
  export type BrandingInput = {
    input: string;
    abbr: string;
  };