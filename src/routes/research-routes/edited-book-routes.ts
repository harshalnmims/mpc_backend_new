import { getEditedBookPublication, insertEditedBookForm, updateEditedBookForm,
    deleteEditedBookForm, editedBookPaginate, editedBookRenderData, editedBookPublicationEditView, downloadPublicationFiles, editedBookPublicationViewForm
} from '$controller/research/edited-book-controller'
import { validateUserSession } from '$middleware/auth.middleware';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';
import multer from 'multer';
const upload = multer();

const editedbookRoutes = Router();

editedbookRoutes.get('/edited-book-publication',asyncErrorHandler(validateUserSession), asyncErrorHandler(getEditedBookPublication));
editedbookRoutes.post('/edited-book-publication-insert',asyncErrorHandler(validateUserSession),upload.array("supporting_documents"), asyncErrorHandler(insertEditedBookForm));
editedbookRoutes.post('/edited-book-publication-update',asyncErrorHandler(validateUserSession),upload.array("supporting_documents"), asyncErrorHandler(updateEditedBookForm));
editedbookRoutes.get('/edited-book-publication-delete',asyncErrorHandler(validateUserSession), asyncErrorHandler(deleteEditedBookForm));
editedbookRoutes.get('/edited-book-publication-paginate',asyncErrorHandler(validateUserSession), asyncErrorHandler(editedBookPaginate));
editedbookRoutes.get('/edited-book-publication-render-data',asyncErrorHandler(validateUserSession), asyncErrorHandler(editedBookRenderData));
editedbookRoutes.get('/edited-book-publication-edit-view', asyncErrorHandler(validateUserSession),asyncErrorHandler(editedBookPublicationEditView));
editedbookRoutes.get('/edited-book-publication-download-file', asyncErrorHandler(validateUserSession),asyncErrorHandler(downloadPublicationFiles));
editedbookRoutes.get('/edited-book-publication-view-form',asyncErrorHandler(validateUserSession), asyncErrorHandler(editedBookPublicationViewForm));



export default editedbookRoutes;