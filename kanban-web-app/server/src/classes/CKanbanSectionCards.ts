import { IKanbanSectionCard } from "@/interfaces/IKanbanSectionCard";
import { IKanbanSectionCards } from "@/interfaces/IKanbanSectionCards";


export class CKanbanSectionCards implements IKanbanSectionCards {

    SectionCards: Array<IKanbanSectionCard>;
    
    constructor(
        _SectionCards: Array<IKanbanSectionCard>,
    ) {
        this.SectionCards = _SectionCards;
    }
}