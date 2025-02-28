import { Router } from 'express';
import nodemailerController from '../controllers/nodemailer.js';
import {
  submitQuizAnswer,
  getQuizWinner,
  getQuizQuestion,
  getAllQuizAnswers,
} from '../controllers/quizController.js';

const router = Router();

// Route to send email
router.post('/send-email', nodemailerController.sendEmail);

router.post('/quiz/submit', submitQuizAnswer);
router.get('/quiz/winner', getQuizWinner);
router.get('/quiz/question', getQuizQuestion);
router.get('/quiz/answers', getAllQuizAnswers);

export default router;
