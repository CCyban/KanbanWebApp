import { IKanban } from "@/interfaces/IKanban";
import { IKanbans } from "@/interfaces/IKanbans";


export class CKanbans implements IKanbans {

    Kanbans?: Array<IKanban>
    
    constructor(
        _Kanbans?: Array<IKanban>,
    ) {
        this.Kanbans = _Kanbans;
    }
}