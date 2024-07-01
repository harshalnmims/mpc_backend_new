import { getBookPublication, insertBookPublicationForm , updateBookPublicationForm, 
    deleteBookPublicationForm
} from '$controller/research/book-publication-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const bookPublicationRoutes = Router();

bookPublicationRoutes.get('/book-publication', asyncErrorHandler(getBookPublication));
bookPublicationRoutes.post('/book-publication-insert', asyncErrorHandler(insertBookPublicationForm));
bookPublicationRoutes.post('/book-publication-update', asyncErrorHandler(updateBookPublicationForm));
bookPublicationRoutes.post('/book-publication-delete', asyncErrorHandler(deleteBookPublicationForm));


export default bookPublicationRoutes;