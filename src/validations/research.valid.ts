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
	wos_indexed: z.boolean({required_error:'WOS indexed is required'}),
	abdc_indexed: z.union([z.number(), z.null()]).optional(),
	ugc_indexed: z.boolean({required_error:'UGC indexed is required'}),
	scs_indexed: z.boolean({required_error:'Scopus indexed is required'}),
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

export const bookChapterPublication = z.object({
	nmims_school : z.array(z.string()).min(1,{message:'School Is Required'}),
    nmims_campus : z.array(z.string()).min(1,{message:'Campus Is Required'}),
	all_authors: z.array(z.number().min(1, 'All authors are required')),
	nmims_authors: z.array(z.number()).min(1, {message:'NMIMS authors are required'}),
	book_editors: z.array(z.number()).min(1, {message:'Book  Editors are required'}),
	book_title: z.string().min(1, 'Book title is required'),
	chapter_title: z.string().min(1, 'Chapter title is required'),
	edition: z.string().min(1, 'Edition is required'),
	volume_no: z.string().min(1, 'Volume number is required'),
	chapter_page_no: z.string().min(1, 'Page number is required'),
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


const teachingItemSchema = z.object({
	input_type: z.string().min(1,{message:'Teaching Excellance Type Is Required'}),
	description: z.string().min(1,{message:'Description Is Required'}),
	link: z.string().min(1,{message:'Link Is Required'}),
  });

export const teachingItemsSchema = z.array(teachingItemSchema);

const meetingItemSchema = z.object({
	input_type: z.string().min(1,{message:'Teaching Excellance Type Is Required'}),
	description: z.string().min(1,{message:'Description Is Required'}),
	link: z.string().min(1,{message:'Link Is Required'}),
  });

export const meetingItemsSchema = z.array(meetingItemSchema);


const brandingItemSchema = z.object({
	input_type: z.string().min(1,{message:'Teaching Excellance Type Is Required'}),
	description: z.string().min(1,{message:'Description Is Required'}),
	link: z.string().min(1,{message:'Link Is Required'}),
  });

export const brandingItemsSchema = z.array(brandingItemSchema);




const singleFileSchema = z.object({
	fieldname: z.string(),
	originalname: z.string(),
	encoding: z.string(),
	mimetype: z.string().refine(
	  (mimetype) => ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/octet-stream'
	  ].includes(mimetype),
	  {
		message: 'Only PDF,DOCX and Excel files are allowed!',
	  }
	),
	buffer: z.instanceof(Buffer),
	size: z.number()
  });
  
  export const filesArraySchema = z.array(singleFileSchema);

  export const caseStudy = z.object({

	nmims_school : z.array(z.string()).min(1,{message:'School Is Required'}),
    nmims_campus : z.array(z.string()).min(1,{message:'Campus Is Required'}),
	all_authors: z.array(z.number()).min(1, {message:'All authors are required'}),
	nmims_authors: z.array(z.number()).min(1, {message:'NMIMS authors are required'}),
	title: z.string().min(1, 'Title is required'),
	edition: z.string().optional(),
	page_no: z.string().optional(),
	volume_no: z.string().min(1, 'Volume number is required'),
	publisher: z.string().min(1, 'Publisher is required'),
	publish_year: z.number().refine((data) => {
	  return data >= 1900 && data <= 3000;
	}, {
	  message: 'Invalid Year'
	}),
	publisher_category: z.number().min(1, 'Publisher category is required'),
	url: z.string().min(1, 'Url is required'),
	nmims_authors_count: z.number().min(1, { message: 'Author count is required' })
	
  });

  
export const researchSeminarObj = z.object({
    nmims_school : z.array(z.string()).min(1,{message:'School Is Required'}),
    nmims_campus : z.array(z.string()).min(1,{message:'Campus Is Required'}),
	topic : z.string().min(1,{message:'Topic is required'}),
	resource_person: z.string().optional(),
	nmims_authors: z.array(z.number()).min(1, {message:'NMIMS authors are required'}),
	paper_title: z.string().min(1, 'Title is required'),
	journal_name: z.string().min(1, 'Journal name is required'),
	publisher: z.string().min(1, 'Publisher is required'),
	publisher_category: z.number().min(1, 'Publisher category is required'),
	page_no: z.string().optional(),
	issn_no:z.string().optional(),
	scopus_site_score: z.string().optional(),
	impact_factor: z.number().optional(),
	scs_indexed: z.string().optional(),
	wos_indexed: z.boolean({required_error:'WOS indexed is required'}),
	gs_indexed: z.string().optional(),
	abdc_indexed: z.union([z.number(), z.null()]).optional(),
	ugc_indexed: z.boolean({required_error:'UGC indexed is required'}),
	doi_no: z.union([z.string(), z.null()]).optional(),
	uid: z.string().min(1, 'UID is required'),
	publication_date: z.string().refine(date => {
        return date !== '1970-01-01' && date !== '';
    }, {
        message: 'Publication date is required',
    }),
	research_date: z.string().refine(date => {
        return date !== '1970-01-01' && date !== '';
    }, {
        message: 'Research seminar date is required',
    }),
});

export const eContentObj =  z.object({
	faculty_name : z.string().min(1,{message:'Faculty name is required'}),
	module: z.string().min(1,{message:'Module developed name is required'}),
	module_platform: z.string().min(1,{message:'Module platform is required'}),
	document_link: z.string().min(1, {message:'Link for document and facility available is required'}),
	facility_list: z.string().min(1, {message:'Link for development facility available is required'}),
	media_link: z.string().min(1, {message:'Link to videos for media centre is required'}),
	launching_date: z.string().refine(date => {
        return date !== '1970-01-01' && date !== '';
    }, {
        message: 'Launching date is required',
    }),

});

  export const researchAwardDataObj = z.object({
	nmims_school : z.array(z.string()).min(1,{message:'School Is Required'}),
    nmims_campus : z.array(z.string()).min(1,{message:'Campus Is Required'}),
	faculty_name: z.string().min(1,{message:'Faculty name is required'}),
	award_name: z.string().min(1,{message:'Award name is required'}),
	award_details: z.string().min(1,{message:'Award details is required'}),
	award_organization : z.string().min(1,{message:'Award organization is required'}),
	award_place: z.string().min(1,{message:'Award place is required'}),
	award_category: z.number().min(1,{message:'Award category is required'}),
	award_date : z.string().refine(date => {
        return date !== '1970-01-01' && date !== '';
    }, {
        message: 'Award date is required',
    })
  });

  const Faculty = z.object({
	faculty_id : z.number(),
    first_name : z.string().min(1,{message:'Faculty firstname is required'}),
	last_name : z.string().min(1,{message:'Faculty lastname is required'}),
	username : z.string().min(1,{message:'Faculty username is required'}),
    institute : z.string().min(1,{message :'Faculty institute name is required'}),
	address : z.string().min(1,{message:'Faculty address is required'}),
	designation : z.string().min(1,{message:'Faculty designation is required'}),
    faculty_type : z.number().refine(data => data != 0,'Faculty type is required'),
  })

  export const facultyObj = z.array(Faculty).min(1,{message:'Faculty details are required'});



