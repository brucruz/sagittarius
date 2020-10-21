import Exam from './Exam';
import Lab from './Lab';

export default interface Price {
  id: string;
  exam_id: string;
  lab_id: string;
  price: number;
  created_date: string;
  exam: Exam;
  lab: Lab;
}
