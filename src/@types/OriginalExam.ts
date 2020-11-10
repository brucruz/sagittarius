import Exam from "./Exam";
import Lab from "./Lab";

export default interface OriginalExam {
    id: string;
    title: string;
    exam_id: string;
    exam: Exam;
    lab_id: string;
    lab: Lab;
    exam_original_id: string;
    lab_id_exam_original_id: string;
    created_date: Date;
    updated_date: Date;
}
