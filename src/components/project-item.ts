import { Draggable } from '../models/drag-drop-interfaces';
import { Project } from '../models/project-model';
import { Component } from './base-component';
import { Autobind } from "../decorators/autobind-decorator"

export class ProjectItem extends Component <HTMLUListElement, HTMLDataListElement> implements Draggable{
    private  project: Project;
    get persons (){
      if (this.project.people == 1){
        return "1 person";
      }
      else{
        return `${this.project.people} persons`;
      }
    }
      constructor(hostId: string, project: Project){
        super("single-project", hostId, false, project.id)
        this.project = project;
        this.configure();
        this.renderContent();
      }
      @Autobind
      dragStartHandler(event: DragEvent) {
        const projid= event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
        //data transfer may return nul beacuse not every object has the property of dataTransfer
      }
    @Autobind
      dragEndHandler(_: DragEvent) {
        console.log('DragEnd');
      }
      configure(){
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    
      }
      renderContent(){
        this.element.querySelector("h2")!.textContent = this.project.title;
        this.element.querySelector("h3")!.textContent = this.persons + " assigned";
        this.element.querySelector("p")!.textContent =this.project.description;
      }
      }
  