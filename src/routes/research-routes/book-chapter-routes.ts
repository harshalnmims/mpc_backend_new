import { getBookChapter, insertBookChapterForm, updateBookChapterForm,
    deleteBookChapterForm
} from '$controller/research/book-chapter-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const bookChapterRoutes = Router();

bookChapterRoutes.get('/book-chapter-publication', asyncErrorHandler(getBookChapter));
bookChapterRoutes.post('/book-chapter-publication-insert', asyncErrorHandler(insertBookChapterForm));
bookChapterRoutes.post('/book-chapter-publication-update', asyncErrorHandler(updateBookChapterForm));
bookChapterRoutes.post('/book-chapter-publication-delete', asyncErrorHandler(deleteBookChapterForm));


export default bookChapterRoutes;