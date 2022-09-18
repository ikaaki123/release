export class Detail{
    constructor(
        public fileId?: string,
        public caseNumber?: number,
        public caseStatus?:string,
        public chechkedBoxEmpty: boolean = false,
        public clientName?: string,
        public correctName: boolean = false,
        public editName: boolean = false,
        public notCheckedName: boolean = false,
        public clientId?: string,
        public correctId: boolean = false,
        public editId: boolean = false,
        public notCheckedId: boolean = false,
        public comment?: string
        ){}
}