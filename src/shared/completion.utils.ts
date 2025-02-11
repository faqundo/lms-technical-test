export function calculateTotalLessons(modules: any[]): number {
    return modules.reduce((total, module) => total + module.lessons.length, 0);
  }
  
  export function calculateCompletedLessons(
    modules: any[],
    userId: string
  ): number {
    return modules.reduce((total, module) => {
      return (
        total +
        module.lessons.filter((lesson: any) =>
          lesson.completions.some((completion: any) => completion.userId === userId)
        ).length
      );
    }, 0);
  }
  
  export function calculateCompletionPercentage(
    totalLessons: number,
    completedLessons: number
  ): number {
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  }