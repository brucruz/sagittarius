import Lab from './Lab';

export default interface LabResultFromAPI {
  lab: Lab;
  distance: number;
  exams_found: number;
  total_exams: number;
  total_price: number;
}
