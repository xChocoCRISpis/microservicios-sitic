export enum eScreenStatus {
    None,
    Adding,
    Updating,
    ViewDetail,
    Delete
}

export enum eErrorType {
    None,
    NotFound,
    FormatError,
    SqlError,
    ValidationError,
    ConnectionError,
    TimeoutError,
    ConflictError,
    UnkownError,
    NocheUwu
}

export enum eOrderStatus{
    Pending,
    Send,
    Completed
}


export enum eChoiceType {
    Caution,
    Accept,
    None
}