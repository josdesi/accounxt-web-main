import fetch from '../auth/FetchInterceptor';

const UserService = {};

UserService.create = (data) => {
	return fetch({
		url: '/iam/users',
		method: 'post',
		data: data
	})
}

export default UserService;