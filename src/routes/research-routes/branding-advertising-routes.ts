import { getBrandingAdvertising, insertBrandingForm, updateBrandingForm,
    deleteBrandingForm
} from '$controller/research/branding-advertising-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const brandingRoutes = Router();

brandingRoutes.get('/branding-advertising', asyncErrorHandler(getBrandingAdvertising));
brandingRoutes.post('/branding-advertising-insert', asyncErrorHandler(insertBrandingForm));
brandingRoutes.post('/branding-advertising-update', asyncErrorHandler(updateBrandingForm));
brandingRoutes.post('/branding-advertising-delete', asyncErrorHandler(deleteBrandingForm));

export default brandingRoutes;


