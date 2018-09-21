/**
 * helper methods for actions
 */
const asyncTypes: AsyncLoad = {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
}

interface AsyncLoad {
    PENDING: string
    SUCCESS: string
    ERROR: string
}

export const createAsyncTypes = (type: string): AsyncLoad =>
    Object.values(asyncTypes).reduce((acc: { [key: string]: string }, curr: string) => {
        acc[curr] = `${type}_${curr}`;
        return acc
    }, {});
