import * as z from 'zod'
import * as zfd from 'zod-form-data';

export const journalPaper = z.object({
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
	other_authors: z.array(z.number()),
	page_no: z.string(),
	issn_no: z.string(),
	scopus_site_score: z.number(),
	impact_factor: z.number().min(1, 'Impact factor is required'),
	doi_no: z.string().min(1, 'DOI number is required'),
    publication_date: z.date().nullable().refine((date) => date!= null, 'Publication date is required'),
	title: z.string().min(1, 'Title is required'),
	gs_indexed: z.string(),
	paper_type: z.number().min(1, 'Paper type is required'),
	wos_indexed: z.boolean({ required_error: 'WOS indexed is required' }),
	abdc_indexed: z.number().min(1, 'ABDC indexed is required'),
	ugc_indexed: z.boolean({ required_error: 'UGC indexed is required' }),
	scs_indexed: z.boolean({ required_error: 'SCS indexed is required' }),
	foreign_authors_count: z.number(),
	foreign_authors: z.array(z.number()),
	student_authors_count: z.number(),
	student_authors: z.array(z.number()),
	supporting_documents: z.any(),
    journal_type: z.number().min(1, 'Journal type is required')
  });

// export const journalPaper = zfd.formData({
// 	  nmims_school: zfd.text().array().nonempty({ message: 'School Is Required' }),
// 	  nmims_campus: zfd.text().array().nonempty({ message: 'Campus Is Required' }),
// 	  publish_year: zfd.numeric().refine(data => data >= 1900 && data <= 3000, {
// 		message: 'Invalid Year'
// 	  }),
// 	  policy_cadre: zfd.numeric().array().nonempty({ message: 'Policy cadre is required' }),
// 	  all_authors: zfd.numeric().array().nonempty({ message: 'All authors are required' }),
// 	  total_authors: zfd.numeric(z.number().min(1, { message: 'Total author count is required' })),
// 	  nmims_authors: zfd.numeric().array().nonempty({ message: 'NMIMS authors are required' }),
// 	  nmims_author_count: zfd.numeric(z.number().min(1, { message: 'Author count is required' })),
// 	  journal_name: zfd.text(z.string().min(1, { message: 'Journal name is required' })),
// 	  uid: zfd.text(z.string().min(1, { message: 'UID is required' })),
// 	  publisher: zfd.text(z.string().min(1, { message: 'Publisher is required' })),
// 	  other_authors: zfd.numeric().array(),
// 	  page_no: zfd.text(),
// 	  issn_no: zfd.text(),
// 	  scopus_site_score: zfd.numeric(),
// 	  impact_factor: zfd.numeric(z.number().min(1, { message: 'Impact factor is required' })),
// 	  doi_no: zfd.text(z.string().min(1, { message: 'DOI number is required' })),
// 	  publication_date: zfd.date().nullable().refine(date => date != null, { message: 'Publication date is required' }),
// 	  title: zfd.text().min(1, { message: 'Title is required' }),
// 	  gs_indexed: zfd.text(),
// 	  paper_type: zfd.number().min(1, { message: 'Paper type is required' }),
// 	  wos_indexed: zfd.boolean({ required_error: 'WOS indexed is required' }),
// 	  abdc_indexed: zfd.number().min(1, { message: 'ABDC indexed is required' }),
// 	  ugc_indexed: zfd.boolean({ required_error: 'UGC indexed is required' }),
// 	  scs_indexed: zfd.boolean({ required_error: 'SCS indexed is required' }),
// 	  foreign_authors_count: zfd.number(),
// 	  foreign_authors: zfd.number().array(),
// 	  student_authors_count: zfd.number(),
// 	  student_authors: zfd.number().array(),
// 	  supporting_documents: zfd.any(), // Handle file uploads separately if necessary
// 	  journal_type: zfd.number().min(1, { message: 'Journal type is required' })
//   });

// export const journalPaper = zfd.formData({
// 	nmims_school: zfd.text().array().nonempty({ message: 'School is required' }),
// 	nmims_campus: zfd.text().array().nonempty({ message: 'Campus is required' }),
// 	publish_year: zfd.text().transform(val => Number(val)).refine(
// 	  year => !isNaN(year) && year >= 1900 && year <= 3000,
// 	  { message: 'Invalid Year' }
// 	),
// 	policy_cadre: zfd.text().array().transform(val => val.map(Number)).refine(
// 	  arr => arr.every(num => !isNaN(num) && num >= 1),
// 	  { message: 'Policy cadre is required' }
// 	),
// 	all_authors: zfd.text().array().transform(val => val.map(Number)).refine(
// 	  arr => arr.every(num => !isNaN(num) && num >= 1),
// 	  { message: 'All authors are required' }
// 	),
// 	total_authors: zfd.text().transform(val => Number(val)).refine(
// 	  val => !isNaN(val) && val >= 1,
// 	  { message: 'Total author count is required' }
// 	),
// 	nmims_authors: zfd.text().array().transform(val => val.map(Number)).refine(
// 	  arr => arr.every(num => !isNaN(num) && num >= 1),
// 	  { message: 'NMIMS authors are required' }
// 	),
// 	nmims_author_count: zfd.text().transform(val => Number(val)).refine(
// 	  val => !isNaN(val) && val >= 1,
// 	  { message: 'Author count is required' }
// 	),
// 	journal_name: zfd.text(z.string().min(1, { message: 'Journal name is required' })),
// 	uid: zfd.text(z.string().min(1, { message: 'UID is required' })),
// 	publisher: zfd.text(z.string().min(1, { message: 'Publisher is required' })),
// 	other_authors: zfd.text().array().transform(val => val.map(Number)).refine(
// 	  arr => arr.every(num => !isNaN(num)),
// 	  { message: 'Other authors must be numbers' }
// 	),
// 	page_no: zfd.text(),
// 	issn_no: zfd.text(),
// 	scopus_site_score: zfd.text().transform(val => Number(val)).refine(
// 	  val => !isNaN(val),
// 	  { message: 'Scopus site score must be a number' }
// 	),
// 	impact_factor: zfd.text().transform(val => Number(val)).refine(
// 	  val => !isNaN(val) && val >= 1,
// 	  { message: 'Impact factor is required' }
// 	),
// 	doi_no: zfd.text(z.string().min(1, { message: 'DOI number is required' })),
// 	publication_date: zfd.text().nullable().transform(val => val ? new Date(val) : null).refine(
// 	  date => date != null,
// 	  { message: 'Publication date is required' }
// 	),
// 	title: zfd.text(z.string().min(1, { message: 'Title is required' })),
// 	gs_indexed: zfd.text().optional(),
// 	paper_type: zfd.text().transform(val => Number(val)).refine(
// 	  val => !isNaN(val) && val >= 1,
// 	  { message: 'Paper type is required' }
// 	),
// 	wos_indexed: zfd.text().transform(val => val === 'true' || val === 'false'),
// 	abdc_indexed: zfd.text().transform(val => Number(val)).refine(
// 	  val => !isNaN(val) && val >= 1,
// 	  { message: 'ABDC indexed is required' }
// 	),
// 	ugc_indexed: zfd.text().transform(val => val === 'true' || val === 'false'),
// 	scs_indexed: zfd.text().transform(val => val === 'true' || val === 'false'),
// 	foreign_authors_count: zfd.text().transform(val => Number(val)).refine(
// 	  val => !isNaN(val),
// 	  { message: 'Foreign authors count must be a number' }
// 	),
// 	foreign_authors: zfd.text().array().transform(val => val.map(Number)).refine(
// 	  arr => arr.every(num => !isNaN(num)),
// 	  { message: 'Foreign authors must be numbers' }
// 	),
// 	student_authors_count: zfd.text().transform(val => Number(val)).refine(
// 	  val => !isNaN(val),
// 	  { message: 'Student authors count must be a number' }
// 	),
// 	student_authors: zfd.text().array().transform(val => val.map(Number)).refine(
// 	  arr => arr.every(num => !isNaN(num)),
// 	  { message: 'Student authors must be numbers' }
// 	),
// 	journal_type: zfd.text().transform(val => Number(val)).refine(
// 	  val => !isNaN(val) && val >= 1,
// 	  { message: 'Journal type is required' }
// 	),
// 	// Supporting documents will be validated manually
// 	supporting_documents: zfd.file(),
//   });
  
  