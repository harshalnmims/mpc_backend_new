import { getBookPublication, insertBookPublicationForm , updateBookPublicationForm, 
    deleteBookPublicationForm
} from '$controller/research/book-publication-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const bookPublicationRoutes = Router();
import multer from 'multer';
const upload = multer();

bookPublicationRoutes.get('/book-publication-paginate', asyncErrorHandler(getBookPublication));
// bookPublicationRoutes.get('/book-publication', asyncErrorHandler(getBookPublication));
bookPublicationRoutes.post('/book-publication-insert', upload.array("supporting_documents"), asyncErrorHandler(insertBookPublicationForm));
bookPublicationRoutes.post('/book-publication-update', asyncErrorHandler(updateBookPublicationForm));
bookPublicationRoutes.post('/book-publication-delete', asyncErrorHandler(deleteBookPublicationForm));


export default bookPublicationRoutes;