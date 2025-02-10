
export interface ICourse {
  id: number;
  title: string;
}

class Course implements ICourse {

  id: number;
  title: string;

  constructor({
    id,
    title,
  }: ICourse) {
    this.id = id;
    this.title = title;
  }
}

export default Course;