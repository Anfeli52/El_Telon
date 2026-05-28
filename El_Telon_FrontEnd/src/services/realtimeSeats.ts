import { onValue, ref } from 'firebase/database';
import { firebaseDatabase } from '../firebase';
import type { FunctionSeats } from '../types/Movie';

export const subscribeToFunctionSeats = (
    functionId: string,
    onData: (seats: FunctionSeats) => void,
    onError?: (error: unknown) => void,
): (() => void) => {
    if (!firebaseDatabase) {
        return () => {};
    }

    const functionSeatsRef = ref(firebaseDatabase, `functions/${functionId}/seats`);

    const unsubscribe = onValue(
        functionSeatsRef,
        (snapshot) => {
            const value = snapshot.val() as FunctionSeats | null;
            if (value) {
                onData(value);
            }
        },
        (error) => {
            if (onError) {
                onError(error);
            }
        },
    );

    return unsubscribe;
};
