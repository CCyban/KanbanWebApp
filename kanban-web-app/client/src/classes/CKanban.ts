import { IKanban } from "@/interfaces/IKanban";
import { IKanbanSection } from "@/interfaces/IKanbanSection";


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