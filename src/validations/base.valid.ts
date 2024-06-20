import * as z from 'zod'

export const CreateMeetingschema = z.object({
    master_meeting: z.object({
      meeting_name: z.string({
        message: 'Meeting Name is required',
      }),
      acad_year: z.string({
        message: 'Acad Year is required',
      }),
      link_passowrd: z.string(),
      meeting_date: z.array(z.string({
        message: 'Meeting Date is required',
      }).regex(/^\d{2}-\d{2}-\d{4}$/)),
      meeting_subject: z.array(
        z.object({
          campus_lid: z.string(),
          program_lid: z.string({
            message: 'program is required',
          }),
          acad_session: z.string({
            message: 'Acad Session is required',
          }),
          subject_lid: z.string({
            message: 'Subject is required',
          }),
          program_anchor: z.array(z.string({
            message: 'Atleast One Program Anchor is required',
          })),
          course_anchor: z.array(z.string({
            message: 'Atleast One Course Anchor is required',
          })),
          attendees: z.array(z.string()),
          is_parent: z.boolean(),
        })
      ),
    }),
  });

export const UpdateMeetingschema = z.object({
  master_meeting: z.object({
    meeting_parent_id: z.string({
        message: 'Try Again !!',
    }),
    meeting_name: z.string({
        message: 'Meeting name is required',
    }),
    acad_year: z.string({
        message: 'Acad Year is required',
    }),
    link_passowrd: z.string(),
    meeting_date: z.string({
        message: 'Date is required',
    }).regex(/^\d{2}-\d{2}-\d{4}$/),
    meeting_subject: z.array(
      z.object({
        active: z.boolean(),
        meeting_id: z.string({
            message: 'Try Again !!',
        }).nullable(),
        campus_lid: z.string(),
        program_lid: z.string({
            message: 'Program is Required',
        }),
        acad_session: z.string({
            message: 'Acad Session is Required',
        }),
        subject_lid: z.string({
            message: 'Subject is Required',
        }),
        program_anchor: z.array(z.string({
            message: 'Atleast one program is required',
        })),
        course_anchor: z.array(z.string({
            message: 'Atleast one course is required',
        })),
        attendees: z.array(z.string()),
        is_parent: z.boolean(),
      })
    ),
  }),
});

export const filterSchema = z.object({
    query: z.object({
        campusLid :z 
            .number({
              message: 'campus is required',
            })
            .optional(),
        campusId :z
            .string({
              message: 'Campus is  string',
            })
            .optional(),
        campusName : z
            .string({
              message: 'Campus is required',
            })
            .optional(),
        programlid : z
            .number({
              message: 'Proram is required',
            })
            .optional(),
        userLid : z
            .number({
              message: 'User is required',
            })
            .optional()
        
    }),
});

export const checkUsernameSchema = z.object({
    query: z.object({
        username: z
            .string({
                message: 'Invalid username',
            })
            .min(8, {
                message: 'Invalid username',
            })
            .max(8, {
                message: 'Invalid username',
            }),
    }),
});


const campusSchema = z.object({
  test_type: z.enum(['string', 'number', 'date']),
  campus_id: z.number(),
  form_a_id: z.any().nullable(),
  point_text: z.union([
    z.string(),
    z.number(),
    z.preprocess((arg) => {
      if (typeof arg === 'string') {
        const date = new Date(arg);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
      return arg;
    }, z.date())
  ])
}).refine((data) => {
  const { test_type, point_text } = data;
  if (test_type === 'string' && typeof point_text !== 'string') {
    return false;
  }
  if (test_type === 'number' && typeof point_text !== 'number') {
    return false;
  }
  if (test_type === 'date' && !(point_text instanceof Date)) {
    return false;
  }
  return true;
}, {
  message: "Invalid point_text for the given test_type",
  path: ["point_text"] // Specify the path where the error should be reported
});


// Define the complete schema for form_a
const formASchema = z.object({
  point_id: z.number(),
  point: z.string(),
  sub_point: z.string(),
  campus_array: z.array(campusSchema)
});

// Define the main schema for the input JSON
const mainSchema = z.object({
  meeting_id: z.number(),
  final_submit: z.boolean(),
  form_a: z.array(formASchema)
});
