import { getBookPublication, insertBookPublicationForm , updateBookPublicationForm, 
   deleteBookPublicationForm, bookPublicationEditviewForm, bookPublicationViewForm, downloadPublicationFiles,
   renderBookPublicationList , bookPublicationInfinite
} from '$controller/research/book-publication-controller'
import { validateUserSession } from '$middleware/auth.middleware';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const bookPublicationRoutes = Router();
import multer from 'multer';
const upload = multer();

bookPublicationRoutes.get('/book-publication-paginate',asyncErrorHandler(validateUserSession), asyncErrorHandler(getBookPublication));
bookPublicationRoutes.get('/book-publication-render',asyncErrorHandler(validateUserSession), asyncErrorHandler(renderBookPublicationList));
bookPublicationRoutes.post('/book-publication-insert',asyncErrorHandler(validateUserSession), upload.array("supporting_documents"), asyncErrorHandler(insertBookPublicationForm));
bookPublicationRoutes.get('/book-publication-edit-view',asyncErrorHandler(validateUserSession), asyncErrorHandler(bookPublicationEditviewForm));
bookPublicationRoutes.post('/book-publication-update',asyncErrorHandler(validateUserSession),  upload.array("supporting_documents"),asyncErrorHandler(updateBookPublicationForm));
bookPublicationRoutes.get('/book-publication-delete',asyncErrorHandler(validateUserSession), asyncErrorHandler(deleteBookPublicationForm));
bookPublicationRoutes.get('/book-publication-view-form',asyncErrorHandler(validateUserSession), asyncErrorHandler(bookPublicationViewForm));
bookPublicationRoutes.get('/book-publication-download-file',asyncErrorHandler(validateUserSession), asyncErrorHandler(downloadPublicationFiles));
bookPublicationRoutes.get('/book-publication-form-infinite',asyncErrorHandler(validateUserSession), asyncErrorHandler(bookPublicationInfinite));


export default bookPublicationRoutes;