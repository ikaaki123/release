export interface Packages {
    id: number;
    businessEntity?: string;
    businessEntityId?: number;
    boxNumber?: number;
    packageNumber?: string;
    mail?: string;
    documentType?: string;
    documentTypeId?: number;
    documentSubtype?: string;
    documentSubtypeId?: number;
    startDate?: Date;
    endDate?: Date;
    status?: string;
    statusId?: number;
    comment?: string;
    fileCount?: number;
    loan: string;
    geni: string;
    personalId: string;
}
