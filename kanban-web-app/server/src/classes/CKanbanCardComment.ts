import { IKanbanCardComment } from "@/interfaces/IKanbanCardComment";

export class CKanbanCardComment implements IKanbanCardComment {
    
    Comment: string;
    Author: string;
    Date: string;

    constructor(
        _Comment: string,
        _Author: string,
        _Date: string,
    ) {
        this.Comment = _Comment;
        this.Author = _Author;
        this.Date = _Date;
    }
}