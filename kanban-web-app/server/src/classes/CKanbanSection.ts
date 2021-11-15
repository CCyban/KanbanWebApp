import { IKanbanSection } from "@/interfaces/IKanbanSection";
import { IKanbanSectionCards } from "@/interfaces/IKanbanSectionCards";


export class CKanbanSection implements IKanbanSection {

    SectionHeader: string;
    SectionCards: IKanbanSectionCards;
    
    constructor(
        _SectionHeader: string,
        _SectionCards: IKanbanSectionCards
    ) {
        this.SectionHeader = _SectionHeader;
        this.SectionCards = _SectionCards;
    }
}