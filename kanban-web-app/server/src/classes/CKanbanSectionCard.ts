import { IKanbanSectionCard } from "@/interfaces/IKanbanSectionCard";
import { IKanbanCardComments } from "@/interfaces/IKanbanCardComments";


export class CKanbanSectionCard implements IKanbanSectionCard {
    
    Title: string;
    Description: string;
    Priority: number;
    Estimation: string;
    Author: string;
    assignedTo: string;
    dateCreated: string;
    lastUpdated: string;
    Comments?: IKanbanCardComments;

    constructor(
        _Title: string,
        _Description: string,
        _Priority: number,
        _Estimation: string,
        _Author: string,
        _assignedTo: string,
        _dateCreated: string,
        _lastUpdated: string,
        _Comments?: IKanbanCardComments,
    ) {
        this.Title = _Title;
        this.Description = _Description;
        this.Priority = _Priority;
        this.Estimation = _Estimation;
        this.Author =_Author;
        this.assignedTo =_assignedTo;
        this.dateCreated = _dateCreated;
        this.lastUpdated = _lastUpdated;
        this.Comments = _Comments;
    }
}