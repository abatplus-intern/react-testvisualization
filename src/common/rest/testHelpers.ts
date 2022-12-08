import { SuspendedPromise, SuspenseStatus } from './suspend';
import * as useQueryModule from './useQuery';

export function mockUseQuery<T extends object>(mockData: T) {
    jest.spyOn(useQueryModule, 'useQuery').mockImplementation((_url: string | undefined) =>
        mockSuspend<T>(Promise.resolve(mockData)).query()
    );
}

export function mockSuspend<T>(promise: Promise<T>): SuspendedPromise<T> {
    let status: SuspenseStatus = SuspenseStatus.Pending;
    let result: T;
    promise.then(
        (value) => {
            status = SuspenseStatus.Success;
            result = value;
        },
        (_err) => {
            status = SuspenseStatus.Error;
        }
    );

    return {
        query() {
            switch (status) {
                case SuspenseStatus.Pending:
                case SuspenseStatus.Error:
                    return undefined;
                case SuspenseStatus.Success:
                default:
                    return result;
            }
        },
    };
}
