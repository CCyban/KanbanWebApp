import { IKanbanCardComments } from "./IKanbanCardComments";

export interface IKanbanSectionCard {
    Title: string;
    Description: string;
    Priority: number;
    Estimation: string;
    Author: string;
    assignedTo: string;
    dateCreated: string;
    lastUpdated: string;
    Comments?: IKanbanCardComments;
}