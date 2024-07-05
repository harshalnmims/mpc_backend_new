import { getBookPublication, insertBookPublicationForm , updateBookPublicationForm, 
    deleteBookPublicationForm, bookPublicationEditviewForm, bookPublicationViewForm, downloadPublicationFiles,
    renderBookPublicationList
} from '$controller/research/book-publication-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const bookPublicationRoutes = Router();
import multer from 'multer';
const upload = multer();

bookPublicationRoutes.get('/book-publication-paginate', asyncErrorHandler(getBookPublication));
bookPublicationRoutes.get('/book-publication-render', asyncErrorHandler(renderBookPublicationList));
bookPublicationRoutes.post('/book-publication-insert', upload.array("supporting_documents"), asyncErrorHandler(insertBookPublicationForm));
bookPublicationRoutes.get('/book-publication-edit-view', asyncErrorHandler(bookPublicationEditviewForm));
bookPublicationRoutes.post('/book-publication-update',  upload.array("supporting_documents"),asyncErrorHandler(updateBookPublicationForm));
bookPublicationRoutes.post('/book-publication-delete', asyncErrorHandler(deleteBookPublicationForm));
bookPublicationRoutes.get('/book-publication-view-form', asyncErrorHandler(bookPublicationViewForm));
bookPublicationRoutes.get('/book-publication-download-file', asyncErrorHandler(downloadPublicationFiles));


export default bookPublicationRoutes;