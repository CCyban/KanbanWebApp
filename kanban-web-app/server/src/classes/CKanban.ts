import { IKanbanSection } from "@/interfaces/IKanbanSection";
import { IKanban } from "../interfaces/IKanban";
import { IKanbanSections } from "../interfaces/IKanbanSections";


export class CKanban implements IKanban {

    KanbanTitle: string;
    KanbanSections: Array<IKanbanSection>;
    
    constructor(
        _KanbanTitle: string,
        _KanbanSections: Array<IKanbanSection>
    ) {
        this.KanbanTitle = _KanbanTitle;
        this.KanbanSections = _KanbanSections;
    }
}