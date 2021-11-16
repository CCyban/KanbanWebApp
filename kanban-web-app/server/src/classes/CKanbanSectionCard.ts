import { IKanbanSectionCard } from "@/interfaces/IKanbanSectionCard";
import { IKanbanCardComments } from "@/interfaces/IKanbanCardComments";
import { IKanbanCardComment } from "@/interfaces/IKanbanCardComment";


export class CKanbanSectionCard implements IKanbanSectionCard {
    
    Title: string;
    Description: string;
    Priority: number;
    Estimation: string;
    Author: string;
    assignedTo: string;
    dateCreated: string;
    lastUpdated: string;
    Comments: Array<IKanbanCardComment>;

    constructor(
        _Title: string,
        _Description: string,
        _Priority: number,
        _Estimation: string,
        _Author: string,
        _assignedTo: string,
        _dateCreated: string,
        _lastUpdated: string,
        _Comments: Array<IKanbanCardComment>,
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