import * as z from 'zod'

export const journalPaper = z.object({
	// body: z.object({
    //  journal_paper : z.object({
    nmims_school : z.array(z.string()).min(1,{message:'School Is Required'}),
    nmims_campus : z.array(z.string()).min(1,{message:'Campus Is Required'}),
	publish_year: z.number().refine((data) => {
	  return data >= 1900 && data <= 3000;
	}, {
	  message: 'Invalid Year'
	}),
	policy_cadre: z.array(z.number().min(1, 'Policy cadre is required')),
	all_authors: z.array(z.number().min(1, 'All authors are required')),
	total_authors: z.number().min(1, {message:'Total author count is required'}),
	nmims_authors: z.array(z.number()).min(1, {message:'NMIMS authors are required'}),
	nmims_author_count: z.number().min(1, { message: 'Author count is required' }),
	journal_name: z.string().min(1, 'Journal name is required'),
	uid: z.string().min(1, 'UID is required'),
	publisher: z.string().min(1, 'Publisher is required'),
	other_authors: z.array(z.number()).optional(),
	page_no: z.string().optional(),
	issn_no: z.string().optional(),
	scopus_site_score: z.number().optional(),
	impact_factor: z.number().min(1, 'Impact factor is required'),
	doi_no: z.string().min(1, 'DOI number is required'),
    publication_date: z.string().nullable().refine((date) => date!= null, 'Publication date is required'),
	title: z.string().min(1, 'Title is required'),
	gs_indexed: z.string().optional(),
	paper_type: z.number().min(1, 'Paper type is required'),
	wos_indexed: z.boolean({ required_error: 'WOS indexed is required' }),
	abdc_indexed: z.number().min(1, 'ABDC indexed is required'),
	ugc_indexed: z.boolean({ required_error: 'UGC indexed is required' }),
	scs_indexed: z.boolean({ required_error: 'SCS indexed is required' }),
	foreign_authors_count: z.number().optional(),
	foreign_authors: z.array(z.number()).optional(),
	student_authors_count: z.number().optional(),
	student_authors: z.array(z.number()).optional(),
	// supporting_documents : z.array(),
	// })
//   })
});

const singleFileSchema = z.object({
	fieldname: z.string(),
	originalname: z.string(),
	encoding: z.string(),
	mimetype: z.string().refine(
	  (mimetype) => ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(mimetype),
	  {
		message: 'Only PDF and DOCX files are allowed!',
	  }
	),
	buffer: z.instanceof(Buffer),
	size: z.number()
  });
  
  export const filesArraySchema = z.array(singleFileSchema);

