import httpService from './http.service';

const todoEndPoint = 'todos/';

const todoSerivce = {
  getTodos: async () => {
    const { data } = await httpService.get(todoEndPoint, {
      params: {
        _page: 1,
        _limit: 5,
      },
    });
    return data;
  },

  createTodo: async (todo) => {
    const { data } = await httpService.post(todoEndPoint, todo);
    return data;
  },
};

export default todoSerivce;
