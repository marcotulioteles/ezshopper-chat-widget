type Annotation = unknown;

type ContentItem = {
    Text: string;
    Annotations: Annotation[];
    ImageFileId: string | null;
};

export type ChatMessage = {
    Role: "USER" | "ASSISTANT";
    Content: ContentItem[];
};
