import { Project, ProjectStatus } from '../models/project-model';

//state management class
/*
here add listener array of function then make allop in then make a method to add function to it then 
loop for every function and add project to it then in projectlist class add variable here is 
assignproject initalized it then initalized method of instance and in addlistenrer method loop
over project add them to a assignproject to render you need new method here renderproject and 
exuse it in the same function of addlistener
*/
//base comonent for listeners

    type Listener<T> = (items: T[]) => void;

    class State<T> {
      protected listeners: Listener<T>[] = [];
    
      addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
      }
    }
    
    export class ProjectState extends State<Project> {
      private projects: Project[] = [];
      private static instance: ProjectState;
    
      private constructor() {
        super();
      }
    
      static getInstance() {
        if (this.instance) {
          return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
      }
    
      addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(
          Math.random().toString(),
          title,
          description,
          numOfPeople,
          ProjectStatus.Active
        );
        this.projects.push(newProject);
        this.updateListeners();
      }
      moveProjects(projectId: string, newStatus: ProjectStatus) {
        const dragProject = this.projects.find(prj => prj.id === projectId);
        console.log(dragProject);
        if (dragProject && dragProject.status !== newStatus) {
          dragProject.status = newStatus;
          this.updateListeners();
        }
      }
      private updateListeners() {
        for (const listenerFn of this.listeners) {
          listenerFn(this.projects.slice());
        }
      }
    }  
    export const projectState = ProjectState.getInstance();
