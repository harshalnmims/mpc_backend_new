import { getEditedBookPublication, insertEditedBookForm, updateEditedBookForm,
    deleteEditedBookForm
} from '$controller/research/edited-book-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const editedbookRoutes = Router();

editedbookRoutes.get('/edited-book-publication', asyncErrorHandler(getEditedBookPublication));
editedbookRoutes.post('/edited-book-publication-insert', asyncErrorHandler(insertEditedBookForm));
editedbookRoutes.post('/edited-book-publication-update', asyncErrorHandler(updateEditedBookForm));
editedbookRoutes.post('/edited-book-publication-delete', asyncErrorHandler(deleteEditedBookForm));


export default editedbookRoutes;