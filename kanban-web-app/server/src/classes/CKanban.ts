import { IKanbanSection } from "@/interfaces/IKanbanSection";
import { IKanban } from "../interfaces/IKanban";


export class CKanban implements IKanban {

    KanbanTitle: string;
    KanbanSections: Array<IKanbanSection>;
    _id?: string;
    
    constructor(
        _KanbanTitle: string,
        _KanbanSections: Array<IKanbanSection>
    ) {
        this.KanbanTitle = _KanbanTitle;
        this.KanbanSections = _KanbanSections;
    }
}