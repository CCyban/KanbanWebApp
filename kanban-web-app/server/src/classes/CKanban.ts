import { IKanban } from "../interfaces/IKanban";
import { IKanbanSections } from "../interfaces/IKanbanSections";


export class CKanban implements IKanban {

    KanbanTitle: string;
    KanbanSections: IKanbanSections;
    
    constructor(
        _KanbanTitle: string,
        _KanbanSections: IKanbanSections
    ) {
        this.KanbanTitle = _KanbanTitle;
        this.KanbanSections = _KanbanSections;
    }
}