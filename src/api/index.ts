import axiosInstance from "./axios";

export const api = {
  get: async <T>(url: string, config?: object): Promise<T> => {
    const res = await axiosInstance.get(url, config);
    return res.data;
  },

  post: async <TData, TResult>(
    url: string,
    data?: TData,
    config?: object,
  ): Promise<TResult> => {
    const res = await axiosInstance.post(url, data, config);
    return res.data;
  },

  put: async <TData, TResult>(
    url: string,
    data?: TData,
    config?: object,
  ): Promise<TResult> => {
    const res = await axiosInstance.put(url, data, config);
    return res.data;
  },

  delete: async <T>(url: string, config?: object): Promise<T> => {
    const res = await axiosInstance.delete(url, config);
    return res.data;
  },
};

type FakeRequestOptions<TSuccess, TError> = {
  data?: TSuccess;
  error?: TError;
  succeed?: boolean;
  delay?: number;
};

export function fakeRequest<TSuccess, TError>(
  options: FakeRequestOptions<TSuccess, TError>,
): Promise<TSuccess> {
  const { data, error, succeed = true, delay = 800 } = options;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (succeed) {
        resolve(data as TSuccess);
      } else {
        reject(error ?? { message: "Fake request failed" });
      }
    }, delay);
  });
}

export * from "./client";
export * from "./query";
