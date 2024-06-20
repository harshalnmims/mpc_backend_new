export type Role =
   | 'role_student'
   | 'role_faculty'
   | 'role_admin'
   | 'role_parent'
   | 'role_exam'
   | 'role_ar'
   | 'role_area_incharge'
   | 'role_cord'
   | 'role_counselor'
   | 'role_dean'
   | 'role_hod'
   | 'role_it'
   | 'role_library'
   | 'role_support_admin'
   | 'role_central';

export type UserSessionData = {
   user_detail: {
      role: Role;
      user_lid: number;
      username: string;
      last_name: string;
      first_name: string;
   };
   accessible_url: AccessibleUrl[];
};

type AccessibleUrl = {
   url: string;
   icon: string;
   label: string;
   module: string | null;
};
