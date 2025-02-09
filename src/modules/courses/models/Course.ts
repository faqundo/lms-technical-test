
export interface ICourse {
  id: string;
  title: string;
}

class Course implements ICourse {

  id: string;
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