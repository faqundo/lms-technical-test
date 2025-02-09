
export interface ICompletion {
  id: string;
  userId: string;
  lessonId: string;
}

class Completion implements ICompletion {
  id: string;
  userId: string;
  lessonId: string;

  constructor(completion: ICompletion) {
    this.id = completion.id;
    this.userId = completion.userId;
    this.lessonId = completion.lessonId;
  }
}

export default Completion;