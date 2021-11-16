import { IKanbanSections } from "@/interfaces/IKanbanSections";
import { IKanbanSection } from "@/interfaces/IKanbanSection";


export class CKanbanSections implements IKanbanSections {

    KanbanSections: Array<IKanbanSection>;
    
    constructor(
        _KanbanSections: Array<IKanbanSection>,
    ) {
        this.KanbanSections = _KanbanSections;
    }
}