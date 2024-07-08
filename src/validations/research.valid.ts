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
	all_authors: z.array(z.number().min(1, 'All authors are required')),
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
	paper_type: z.number().min(1, 'Paper type is required').refine(data => data!=0,'Paper Type Is Required'),
	wos_indexed: z.boolean({ required_error: 'WOS indexed is required' }),
	abdc_indexed: z.number().min(1, 'ABDC indexed is required').refine(data => data!=0,'ABDC indexed Is Required'),
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


export const bookPublication = z.object({
	nmims_school : z.array(z.string()).min(1,{message:'School Is Required'}),
    nmims_campus : z.array(z.string()).min(1,{message:'Campus Is Required'}),
	all_authors: z.array(z.number().min(1, 'All authors are required')),
	nmims_authors: z.array(z.number()).min(1, {message:'NMIMS authors are required'}),
	title: z.string().min(1, 'Title is required'),
	edition: z.string().min(1, 'Edition is required'),
	volume_no: z.string().min(1, 'Volume number is required'),
	publisher_category : z.number(),
	publish_year: z.number().refine((data) => {
		return data >= 1900 && data <= 3000;
	  }, {
		message: 'Invalid Year'
	  }),
	web_link: z.string().min(1, 'Website link  is required'),
	publisher: z.string().min(1, 'Publisher Name is required'),
	isbn_no: z.string().min(1, 'ISBN Number is required'),
	doi_no: z.string().min(1, 'WebLink /DOI No. is required'),
	publication_place: z.string().min(1, 'Place Of Publication is rquired'),
	nmims_authors_count: z.number(),

})

const singleFileSchema = z.object({
	fieldname: z.string(),
	originalname: z.string(),
	encoding: z.string(),
	mimetype: z.string().refine(
	  (mimetype) => ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	  ].includes(mimetype),
	  {
		message: 'Only PDF and DOCX and Excel files are allowed!',
	  }
	),
	buffer: z.instanceof(Buffer),
	size: z.number()
  });
  
  export const filesArraySchema = z.array(singleFileSchema);

