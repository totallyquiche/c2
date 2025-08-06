import type { Capture } from '$types/Capture';
import type { Writable } from 'svelte/store';

const handleDraggableDragStart = (event: DragEvent, captures: Capture[]) => {
    const target = event.target as HTMLElement;
    const captureId = target.dataset.captureId;
    const capture = captures.find((capture: Capture) => capture.id === captureId);

    if (!capture || capture.isEditing) {
        event.preventDefault();
        return;
    }

    if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move';

        const data = {
            captures,
            captureId
        };

        event.dataTransfer.setData('application/json', JSON.stringify(data));
    }
};

const handleDraggableDragEnd = (event: DragEvent) => {
    if (event.dataTransfer) {
        event.dataTransfer.clearData();
    }
};

const handleDragTargetDragEnter = (event: DragEvent) => {
    event.preventDefault();
};

const handleDragTargetDragOver = (event: DragEvent) => {
    event.preventDefault();

    if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
    }
};

const handleDragTargetDrop = (
    event: DragEvent,
    capturesStore: Writable<Capture[]>,
    targetListId: string,
    handleUpsert?: (capture: Capture) => Promise<void>
) => {
    event.preventDefault();

    const data = JSON.parse(event.dataTransfer?.getData('application/json') || '{}');

    if (data.captures && data.captureId) {
        capturesStore.update((captures: Capture[]) => {
            return captures.map((capture: Capture) => {
                if (capture.id === data.captureId) {
                    const updatedCapture = {
                        ...capture,
                        listId: targetListId
                    };

                    if (handleUpsert && capture.listId !== targetListId) {
                        updatedCapture.updated_at = new Date().toISOString();
                        handleUpsert(updatedCapture);
                    }

                    return updatedCapture;
                }
                return capture;
            });
        });
    }
};

export {
    handleDragTargetDragEnter,
    handleDragTargetDragOver,
    handleDragTargetDrop,
    handleDraggableDragStart,
    handleDraggableDragEnd
};
