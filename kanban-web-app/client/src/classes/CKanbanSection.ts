import { IKanbanSection } from "@/interfaces/IKanbanSection";
import { IKanbanSectionCard } from "@/interfaces/IKanbanSectionCard";


export class CKanbanSection implements IKanbanSection {

    SectionHeader: string;
    SectionCards: Array<IKanbanSectionCard>;
    
    constructor(
        _SectionHeader?: string,
        _SectionCards?: Array<IKanbanSectionCard>
    ) {
        this.SectionHeader = _SectionHeader ?? "";
        this.SectionCards = _SectionCards ?? [];
    }
}