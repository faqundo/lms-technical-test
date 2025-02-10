
export interface ILesson {
  id: string;
  moduleId: string;
  title: string;
}

class Lesson implements ILesson {

  id: string;
  moduleId: string;
  title: string;

  constructor({
    id,
    moduleId,
    title,
  }: ILesson) {
    this.id = id;
    this.moduleId = moduleId;
    this.title = title;
  }
}

export default Lesson;
