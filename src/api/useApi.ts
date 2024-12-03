import axios from 'axios';
import { useQuasar } from 'quasar';

export function useApi() {
  const mainUrl = 'http://127.0.0.1:8000/api';
  const $q = useQuasar(); // Quasar's instance for showing/hiding the loader

  const showLoader = (message = 'Processing...') => {
    $q.loading.show({
      message,
      spinnerColor: 'blue',
    });
  };

  const hideLoader = () => {
    $q.loading.hide();
  };

  const handleApiRequest = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    request: Promise<any>,
    loaderMessage?: string
  ) => {
    try {
      if (loaderMessage) showLoader(loaderMessage);
      const response = await request;
      return response;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    } finally {
      hideLoader();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getApi = (url: string): Promise<any> => {
    return handleApiRequest(axios.get(`${mainUrl}/${url}`), 'Fetching data...');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const postApi = (url: string, params: object): Promise<any> => {
    return handleApiRequest(
      axios.post(`${mainUrl}/${url}`, params, { withCredentials: true }),
      'Submitting data...'
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateApi = (id: number, updatedData: object): Promise<any> => {
    return handleApiRequest(
      axios.post(`${mainUrl}/${id}`, updatedData),
      'Updating data...'
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deleteApi = (id: number): Promise<any> => {
    return handleApiRequest(
      axios.delete(`${mainUrl}/${id}`),
      'Deleting item...'
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getCSRFToken = (): Promise<any> => {
    return handleApiRequest(
      axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      }),
      'Fetching CSRF token...'
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loginApi = (params: object): Promise<any> => {
    return handleApiRequest(
      axios.post(`${mainUrl}/login`, params, { withCredentials: true }),
      'Fetch User Credentials...'
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const registerApi = (params: object): Promise<any> => {
    return handleApiRequest(
      axios.post(`${mainUrl}/register`, params, { withCredentials: true }),
      'Fetch User Credentials...'
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const logoutApi = (): Promise<any> => {
    const userToken = $q.localStorage.getItem('token');
    return handleApiRequest(
      axios.post(
        `${mainUrl}/logout`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`, // Replace userToken with the actual token
          },
        }
      ),
      'Fetch User Credentials...'
    );
  };

  return {
    getApi,
    postApi,
    updateApi,
    deleteApi,
    getCSRFToken,
    loginApi,
    registerApi,
    logoutApi,
  };
}
