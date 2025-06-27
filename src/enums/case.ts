

export enum CaseStatus {
    WAITING = "waiting",
    WAITING_FOR_PROSECUTOR = "waiting_for_prosecutor",
    WAITING_FOR_JUDGE = "waiting_for_judge",
    WAITING_FOR_COURT = "waiting_for_court",
    WAITING_FOR_EXECUTION = "waiting_for_execution",
    WAITING_FOR_ANSWER = "waiting_for_answer",
    WAITING_FOR_ANALYSIS = "waiting_for_analysis",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    DELETED = "deleted",
    CLOSED = "closed",
}