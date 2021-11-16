import { IKanbanCardComment } from "@/interfaces/IKanbanCardComment";
import { IKanbanCardComments } from "@/interfaces/IKanbanCardComments";


export class CKanbanCardComments implements IKanbanCardComments {

    Comments: Array<IKanbanCardComment>;
    
    constructor(
        _Comments: Array<IKanbanCardComment>,
    ) {
        this.Comments = _Comments;
    }
}