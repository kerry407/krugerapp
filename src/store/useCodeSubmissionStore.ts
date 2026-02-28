import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CodeSubmissionState {
    submissionId: string | null;
    isCodeRequested: boolean;
    setSubmissionSuccess: (id: string) => void;
    clearSubmission: () => void;
}

export const useCodeSubmissionStore = create<CodeSubmissionState>()(
    persist(
        (set) => ({
            submissionId: null,
            isCodeRequested: false,

            setSubmissionSuccess: (id) => set({
                submissionId: id,
                isCodeRequested: true
            }),

            clearSubmission: () => set({
                submissionId: null,
                isCodeRequested: false
            }),
        }),
        {
            name: 'code-submission-storage',
        }
    )
)
