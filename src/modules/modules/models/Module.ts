
export interface IModule {
  id: string;
  title: string;
  isRootModule: boolean;
  moduleId: string;
  courseId: string;
}

class Module implements IModule {

  id: string;
  title: string;
  isRootModule: boolean;
  moduleId: string;
  courseId: string;

  constructor({
    id,
    title,
    isRootModule,
    moduleId,
    courseId,
  }: IModule) {
    this.id = id;
    this.title = title;
    this.isRootModule = isRootModule;
    this.moduleId = moduleId;
    this.courseId = courseId;
  }
}

export default Module;